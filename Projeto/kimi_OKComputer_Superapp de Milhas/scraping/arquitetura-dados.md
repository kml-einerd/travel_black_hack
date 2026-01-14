# MilesAI - Arquitetura de Scraping e Dados

## 🎯 VISÃO GERAL

Sistema completo de coleta, processamento e distribuição de dados sobre milhas e viagens, utilizando web scraping inteligente, APIs e machine learning para fornecer informações precisas e em tempo real.

---

## 📊 FONTES DE DADOS

### 1. SITES PRIORITÁRIOS

#### Tier 1 - Fontes Essenciais

**The Points Guy (thepointsguy.com)**
```typescript
interface TPGScraper {
  endpoints: {
    articles: '/news/',
    guides: '/guides/',
    deals: '/deals/',
    creditCards: '/credit-cards/',
    valuations: '/loyalty-programs/monthly-valuations/',
  };
  dataPoints: {
    creditCardReviews: {
      name: string;
      issuer: string;
      annualFee: number;
      rewardsRate: string;
      welcomeBonus: number;
      bonusRequirement: number;
      pros: string[];
      cons: string[];
      rating: number;
      lastUpdated: Date;
    }[];
    pointValuations: {
      program: string;
      value: number; // cents per point
      lastUpdated: Date;
      methodology: string;
    }[];
    deals: {
      title: string;
      description: string;
      type: 'flight' | 'hotel' | 'credit_card';
      value: number;
      expiration: Date;
      url: string;
    }[];
  };
}
```

**Daily Drop (dailydrop.com)**
```typescript
interface DailyDropScraper {
  endpoints: {
    deals: '/deals/';
    creditCards: '/ranked-credit-cards/';
    guides: '/guides/';
    course: '/course-videos/';
  };
  dataPoints: {
    rankedCards: {
      rank: number;
      cardName: string;
      issuer: string;
      annualFee: number;
      welcomeBonus: number;
      bonusValue: number;
      pros: string[];
      cons: string[];
      recommendedFor: string[];
    }[];
    dealAlerts: {
      title: string;
      route: string;
      price: number;
      pointsCost: number;
      availability: string;
      bookBy: Date;
    }[];
  };
}
```

**Award Wallet (awardwallet.com)**
```typescript
interface AwardWalletScraper {
  endpoints: {
    valuations: '/point-mile-values/';
    podcast: '/podcast/';
  };
  dataPoints: {
    pointValues: {
      program: string;
      type: 'transferable' | 'airline' | 'hotel';
      averageValue: number;
      domesticEconomy: number;
      domesticBusiness: number;
      internationalEconomy: number;
      internationalBusiness: number;
      firstClass: number;
      lastUpdated: Date;
    }[];
    transferBonuses: {
      fromProgram: string;
      toProgram: string;
      bonus: number; // percentage
      expiration: Date;
      minTransfer: number;
      maxBonus: number;
    }[];
  };
}
```

#### Tier 2 - Fontes Complementares

**Doctor of Credit (doctorofcredit.com)**
- Credit card churning data
- Bank account bonuses
- Manufactured spending techniques

**One Mile at a Time (onemileatatime.com)**
- Trip reports detalhados
- Reviews de produtos premium
- Análises de rotas

**NerdWallet (nerdwallet.com)**
- Comparações de cartões
- Calculadoras financeiras
- Guias educacionais

**CreditCards.com**
- Reviews de cashback
- Comparações lado a lado
- Ratings detalhados

---

## 🔧 ARQUITETURA DE SCRAPING

### 1. Sistema de Filas

```typescript
// lib/scraping/queue-system.ts
import { Queue } from 'bull';
import { redis } from '@/lib/redis';

export class ScrapingQueue {
  private queues: Map<string, Queue>;
  
  constructor() {
    this.queues = new Map();
    this.initializeQueues();
  }
  
  private initializeQueues() {
    // Fila principal de scraping
    this.queues.set('scraping', new Queue('scraping', {
      redis: { host: process.env.REDIS_HOST, port: 6379 },
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 50,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
      },
    }));
    
    // Fila de processamento de dados
    this.queues.set('processing', new Queue('processing', {
      redis: { host: process.env.REDIS_HOST, port: 6379 },
      defaultJobOptions: {
        removeOnComplete: 1000,
        removeOnFail: 200,
        attempts: 5,
      },
    }));
    
    // Fila de alertas
    this.queues.set('alerts', new Queue('alerts', {
      redis: { host: process.env.REDIS_HOST, port: 6379 },
      defaultJobOptions: {
        removeOnComplete: 10000,
        removeOnFail: 1000,
      },
    }));
  }
  
  async scheduleScrapingJob(
    source: string,
    options: ScrapingOptions
  ): Promise<void> {
    const queue = this.queues.get('scraping')!;
    
    await queue.add(
      'scrape-source',
      { source, options },
      {
        priority: this.getPriority(source),
        repeat: this.getRepeatPattern(source),
        jobId: `scrape-${source}-${Date.now()}`,
      }
    );
  }
  
  private getPriority(source: string): number {
    const priorities: Record<string, number> = {
      'tpg': 10,
      'daily-drop': 10,
      'award-wallet': 8,
      'doctor-of-credit': 6,
      'one-mile-at-a-time': 5,
    };
    return priorities[source] || 1;
  }
  
  private getRepeatPattern(source: string): { cron: string } {
    const patterns: Record<string, string> = {
      'tpg': '0 */2 * * *', // A cada 2 horas
      'daily-drop': '0 */3 * * *', // A cada 3 horas
      'award-wallet': '0 6 * * *', // Diário às 6h
      'doctor-of-credit': '0 8,20 * * *', // 2x ao dia
      'one-mile-at-a-time': '0 12 * * *', // Diário ao meio-dia
    };
    
    return { cron: patterns[source] || '0 */6 * * *' };
  }
}
```

### 2. Scrapers Específicos

#### Credit Card Scraper

```typescript
// lib/scrapers/credit-cards/tpg-scraper.ts
import { Page } from 'puppeteer';
import { RateLimiter } from '@/lib/rate-limiter';

export class TPGCreditCardScraper {
  private rateLimiter: RateLimiter;
  
  constructor() {
    this.rateLimiter = new RateLimiter({
      tokensPerInterval: 10,
      interval: 'minute',
    });
  }
  
  async scrapeCreditCards(page: Page): Promise<CreditCardData[]> {
    await this.rateLimiter.removeTokens(1);
    
    // Navegar para página de cartões
    await page.goto('https://thepointsguy.com/credit-cards/', {
      waitUntil: 'networkidle2',
    });
    
    // Aceitar cookies se necessário
    await this.handleCookieBanner(page);
    
    // Extrair lista de cartões
    const cards = await page.evaluate(() => {
      const cardElements = document.querySelectorAll('.card-review');
      
      return Array.from(cardElements).map(card => {
        const name = card.querySelector('h2')?.textContent?.trim() || '';
        const issuer = this.extractIssuer(name);
        const annualFee = this.extractAnnualFee(card);
        const welcomeBonus = this.extractWelcomeBonus(card);
        const rating = this.extractRating(card);
        
        return {
          name,
          issuer,
          annualFee,
          welcomeBonus,
          rating,
          source: 'tpg',
          scrapedAt: new Date().toISOString(),
        };
      });
    });
    
    // Enriquecer dados
    const enrichedCards = await Promise.all(
      cards.map(card => this.enrichCardData(card, page))
    );
    
    return enrichedCards;
  }
  
  private async enrichCardData(
    card: CreditCardData,
    page: Page
  ): Promise<CreditCardData> {
    // Clicar no cartão para ver página detalhada
    const cardLink = await page.$eval(`h2:has-text("${card.name}")`, 
      el => el.closest('a')?.href
    );
    
    if (cardLink) {
      await page.goto(cardLink, { waitUntil: 'networkidle2' });
      
      // Extrair dados adicionais
      const details = await page.evaluate(() => {
        return {
          rewardsRate: this.extractRewardsRate(),
          bonusCategories: this.extractBonusCategories(),
          benefits: this.extractBenefits(),
          pros: this.extractPros(),
          cons: this.extractCons(),
          fullReview: this.extractReviewText(),
        };
      });
      
      return { ...card, ...details };
    }
    
    return card;
  }
  
  private extractIssuer(cardName: string): string {
    const issuers = {
      'Chase': ['Chase', 'Sapphire'],
      'American Express': ['Amex', 'American Express'],
      'Citi': ['Citi', 'ThankYou'],
      'Capital One': ['Capital One', 'Venture'],
      'Bank of America': ['Bank of America'],
    };
    
    for (const [issuer, keywords] of Object.entries(issuers)) {
      if (keywords.some(keyword => cardName.includes(keyword))) {
        return issuer;
      }
    }
    
    return 'Unknown';
  }
  
  private extractAnnualFee(element: Element): number {
    const feeText = element.querySelector('.annual-fee')?.textContent || '';
    const match = feeText.match(/\$(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }
  
  private extractWelcomeBonus(element: Element): number {
    const bonusText = element.querySelector('.welcome-bonus')?.textContent || '';
    const match = bonusText.match(/(\d+),?\d*\s*(points|pts|milhas)/i);
    return match ? parseInt(match[1].replace(/,/g, '')) : 0;
  }
}
```

#### Deal Scraper

```typescript
// lib/scrapers/deals/daily-drop-scraper.ts
export class DailyDropScraper {
  async scrapeDeals(): Promise<DealData[]> {
    const response = await fetch('https://www.dailydrop.com/deals/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MilesAI/1.0)',
      },
    });
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const deals: DealData[] = [];
    
    $('.deal-item').each((i, element) => {
      const deal = this.extractDeal($, element);
      if (this.isValidDeal(deal)) {
        deals.push(deal);
      }
    });
    
    // Enriquecer com dados adicionais
    const enrichedDeals = await Promise.all(
      deals.map(deal => this.enrichDeal(deal))
    );
    
    return enrichedDeals;
  }
  
  private extractDeal($: cheerio.Root, element: cheerio.Element): DealData {
    const $deal = $(element);
    
    const title = $deal.find('.deal-title').text().trim();
    const description = $deal.find('.deal-description').text().trim();
    const route = this.extractRoute(title);
    const price = this.extractPrice(description);
    const points = this.extractPoints(description);
    const availability = $deal.find('.availability').text().trim();
    const bookBy = this.extractBookBy($deal);
    const url = $deal.find('a').attr('href') || '';
    
    return {
      title,
      description,
      route: {
        origin: route.origin,
        destination: route.destination,
      },
      price,
      pointsCost: points,
      availability,
      bookBy,
      url: `https://www.dailydrop.com${url}`,
      source: 'daily-drop',
      scrapedAt: new Date(),
    };
  }
  
  private extractRoute(title: string): { origin: string; destination: string } {
    // Patterns: "NYC to Paris", "NYC-CDG", "New York → Paris"
    const patterns = [
      /([A-Z]{3})\s*(?:to|→|-)\s*([A-Z]{3})/,
      /([A-Za-z]+)\s*(?:to|→|-)\s*([A-Za-z]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = title.match(pattern);
      if (match) {
        return { origin: match[1], destination: match[2] };
      }
    }
    
    return { origin: '', destination: '' };
  }
  
  private async enrichDeal(deal: DealData): Promise<DealData> {
    // Adicionar CPM calculation
    if (deal.price && deal.pointsCost) {
      deal.cpm = this.calculateCPM(deal.price, deal.pointsCost);
    }
    
    // Verificar disponibilidade em tempo real
    deal.realTimeAvailability = await this.checkAvailability(deal);
    
    // Adicionar tags e categorias
    deal.tags = this.categorizeDeal(deal);
    
    return deal;
  }
  
  private calculateCPM(price: number, points: number): number {
    // Cents per mile calculation
    return (price * 100) / points;
  }
  
  private async checkAvailability(deal: DealData): Promise<boolean> {
    // Implementar verificação de disponibilidade
    // Usando APIs de companhias aéreas ou scraping
    return true;
  }
}
```

### 3. Anti-Bot Detection

```typescript
// lib/scraping/stealth.ts
export class StealthBrowser {
  async createStealthPage(browser: Browser): Promise<Page> {
    const page = await browser.newPage();
    
    // Configurações básicas
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    );
    
    // Bypass bot detection
    await page.evaluateOnNewDocument(() => {
      // Webdriver property
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
      });
      
      // Chrome runtime
      window.chrome = {
        runtime: {},
      };
      
      // Permissions
      const originalQuery = window.navigator.permissions.query;
      window.navigator.permissions.query = (parameters) => (
        parameters.name === 'notifications'
          ? Promise.resolve({ state: Notification.permission })
          : originalQuery(parameters)
      );
      
      // Plugins
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5],
      });
      
      // Languages
      Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en'],
      });
    });
    
    // Random mouse movements
    await this.simulateHumanBehavior(page);
    
    return page;
  }
  
  private async simulateHumanBehavior(page: Page): Promise<void> {
    // Mouse movements aleatórios
    await page.mouse.move(
      Math.random() * 1000 + 100,
      Math.random() * 500 + 100
    );
    
    // Pequenos delays entre ações
    await page.waitForTimeout(Math.random() * 2000 + 1000);
    
    // Scroll aleatório
    await page.evaluate(() => {
      window.scrollBy(0, Math.random() * 500);
    });
  }
}
```

---

## 🗄️ PROCESSAMENTO E ARMAZENAMENTO

### 1. Pipeline de Processamento

```typescript
// lib/processing/pipeline.ts
export class DataPipeline {
  async processScrapedData(data: ScrapedData): Promise<ProcessedData> {
    // 1. Validação
    const validated = await this.validateData(data);
    
    // 2. Normalização
    const normalized = await this.normalizeData(validated);
    
    // 3. Enriquecimento
    const enriched = await this.enrichData(normalized);
    
    // 4. Deduplicação
    const deduplicated = await this.deduplicateData(enriched);
    
    // 5. Agregação
    const aggregated = await this.aggregateData(deduplicated);
    
    // 6. Indexação
    await this.indexData(aggregated);
    
    return aggregated;
  }
  
  private async validateData(data: ScrapedData): Promise<ValidatedData> {
    const schema = this.getSchemaForDataType(data.type);
    
    // Validar campos obrigatórios
    const requiredFields = Object.keys(schema.properties);
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new ValidationError(`Missing fields: ${missingFields.join(', ')}`);
    }
    
    // Validar tipos e formatos
    for (const [field, value] of Object.entries(data)) {
      const fieldSchema = schema.properties[field];
      if (fieldSchema) {
        await this.validateField(field, value, fieldSchema);
      }
    }
    
    return data as ValidatedData;
  }
  
  private async normalizeData(data: ValidatedData): Promise<NormalizedData> {
    return {
      ...data,
      // Normalizar nomes
      issuer: this.normalizeIssuer(data.issuer),
      // Normalizar datas
      scrapedAt: new Date(data.scrapedAt).toISOString(),
      // Normalizar valores
      annualFee: this.normalizeCurrency(data.annualFee),
      // Normalizar texto
      description: this.normalizeText(data.description),
    };
  }
  
  private async enrichData(data: NormalizedData): Promise<EnrichedData> {
    // Adicionar metadados
    const enriched = {
      ...data,
      id: this.generateId(data),
      version: 1,
      processingTime: Date.now(),
      dataQuality: await this.calculateDataQuality(data),
    };
    
    // Enriquecer com dados externos
    if (data.type === 'credit_card') {
      enriched.reviews = await this.getExternalReviews(data.name);
      enriched.ratings = await this.getExternalRatings(data.name);
    }
    
    return enriched;
  }
  
  private async deduplicateData(data: EnrichedData[]): Promise<EnrichedData[]> {
    const unique = new Map<string, EnrichedData>();
    
    for (const item of data) {
      const key = this.generateDedupKey(item);
      
      if (!unique.has(key)) {
        unique.set(key, item);
      } else {
        // Merge com registro existente se mais recente
        const existing = unique.get(key)!;
        if (new Date(item.scrapedAt) > new Date(existing.scrapedAt)) {
          unique.set(key, { ...existing, ...item, version: existing.version + 1 });
        }
      }
    }
    
    return Array.from(unique.values());
  }
}
```

### 2. Banco de Dados

#### Schema de Dados Coletados

```sql
-- Tabela de cartões de crédito
CREATE TABLE credit_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    issuer VARCHAR(100) NOT NULL,
    network VARCHAR(50),
    annual_fee DECIMAL(10,2),
    rewards_rate JSONB,
    welcome_bonus JSONB,
    bonus_categories JSONB,
    benefits JSONB,
    rating DECIMAL(3,2),
    review_count INTEGER DEFAULT 0,
    source VARCHAR(50),
    source_url VARCHAR(500),
    last_scraped_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_issuer (issuer),
    INDEX idx_annual_fee (annual_fee),
    INDEX idx_rating (rating),
    INDEX idx_source (source)
);

-- Tabela de programas de pontos
CREATE TABLE point_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    type VARCHAR(20) NOT NULL, -- 'transferable', 'airline', 'hotel'
    currency_name VARCHAR(50),
    base_value DECIMAL(5,3), -- cents per point
    values_by_category JSONB, -- different redemption values
    transfer_partners JSONB,
    expiration_policy JSONB,
    source VARCHAR(50),
    last_updated_at TIMESTAMP,
    
    INDEX idx_type (type),
    INDEX idx_base_value (base_value)
);

-- Tabela de deals/voos
CREATE TABLE deals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    category VARCHAR(20) NOT NULL, -- 'flight', 'hotel', 'credit_card'
    route JSONB, -- {origin, destination}
    price DECIMAL(10,2),
    points_cost INTEGER,
    taxes DECIMAL(8,2),
    cpm DECIMAL(5,3), -- cents per mile
    availability VARCHAR(50),
    book_by_date DATE,
    travel_period JSONB, -- {start, end}
    airline VARCHAR(100),
    aircraft VARCHAR(50),
    class VARCHAR(20), -- 'economy', 'business', 'first'
    url VARCHAR(500),
    tags JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    source VARCHAR(50),
    scraped_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_category (category),
    INDEX idx_route ((route->>'origin'), (route->>'destination')),
    INDEX idx_cpm (cpm),
    INDEX idx_book_by (book_by_date),
    INDEX idx_is_active (is_active)
);

-- Tabela de valores de pontos (histórico)
CREATE TABLE point_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID REFERENCES point_programs(id),
    value DECIMAL(5,3) NOT NULL,
    value_type VARCHAR(20), -- 'average', 'domestic_economy', etc.
    source VARCHAR(50),
    scraped_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_program_id (program_id),
    INDEX idx_scraped_at (scraped_at)
);

-- Tabela de transfer bonuses
CREATE TABLE transfer_bonuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_program_id UUID REFERENCES point_programs(id),
    to_program_id UUID REFERENCES point_programs(id),
    bonus_percentage INTEGER NOT NULL,
    min_transfer INTEGER,
    max_bonus INTEGER,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    source VARCHAR(50),
    scraped_at TIMESTAMP,
    
    INDEX idx_from_program (from_program_id),
    INDEX idx_to_program (to_program_id),
    INDEX idx_is_active (is_active),
    INDEX idx_end_date (end_date)
);

-- Tabela de scraping logs
CREATE TABLE scraping_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL, -- 'success', 'error', 'timeout'
    items_scraped INTEGER DEFAULT 0,
    error_message TEXT,
    duration_ms INTEGER,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_source (source),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);
```

### 3. Cache Strategy

```typescript
// lib/cache/strategy.ts
export class CacheManager {
  private redis: Redis;
  
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: 6379,
      db: 0,
    });
  }
  
  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }
  
  async set<T>(
    key: string,
    value: T,
    ttl?: number
  ): Promise<void> {
    const data = JSON.stringify(value);
    
    if (ttl) {
      await this.redis.setex(key, ttl, data);
    } else {
      await this.redis.set(key, data);
    }
  }
  
  async invalidate(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
  
  // Cache strategies por tipo de dado
  async getCreditCards(filters: any): Promise<CreditCard[]> {
    const cacheKey = `credit_cards:${JSON.stringify(filters)}`;
    
    // Tentar cache primeiro
    const cached = await this.get<CreditCard[]>(cacheKey);
    if (cached) {
      return cached;
    }
    
    // Buscar do banco
    const cards = await prisma.creditCard.findMany({
      where: filters,
      orderBy: { rating: 'desc' },
    });
    
    // Cachear por 1 hora
    await this.set(cacheKey, cards, 3600);
    
    return cards;
  }
  
  async getDeals(filters: any): Promise<Deal[]> {
    const cacheKey = `deals:${JSON.stringify(filters)}`;
    
    const cached = await this.get<Deal[]>(cacheKey);
    if (cached) {
      return cached;
    }
    
    const deals = await prisma.deal.findMany({
      where: {
        ...filters,
        is_active: true,
        book_by_date: { gte: new Date() },
      },
      orderBy: { cpm: 'desc' },
    });
    
    // Cachear por 30 minutos (deals mudam rápido)
    await this.set(cacheKey, deals, 1800);
    
    return deals;
  }
}
```

---

## 🤖 MACHINE LEARNING

### 1. Modelos de Predição

#### Preditor de Disponibilidade

```typescript
// lib/ml/availability-predictor.ts
export class AvailabilityPredictor {
  private model: tf.LayersModel | null = null;
  
  async trainModel(): Promise<void> {
    // Carregar dados históricos
    const trainingData = await this.loadTrainingData();
    
    // Preparar features
    const features = this.prepareFeatures(trainingData);
    const labels = this.prepareLabels(trainingData);
    
    // Criar modelo
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [features.shape[1]], units: 64, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 32, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 1, activation: 'sigmoid' }),
      ],
    });
    
    // Compilar
    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'binaryCrossentropy',
      metrics: ['accuracy'],
    });
    
    // Treinar
    await this.model.fit(features, labels, {
      epochs: 50,
      batchSize: 32,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch}: Loss = ${logs?.loss?.toFixed(4)}`);
        },
      },
    });
    
    // Salvar modelo
    await this.model.save('file://./models/availability-predictor');
  }
  
  async predictAvailability(route: Route, date: Date): Promise<Prediction> {
    if (!this.model) {
      this.model = await tf.loadLayersModel('file://./models/availability-predictor/model.json');
    }
    
    // Preparar features
    const features = tf.tensor2d([[
      this.encodeAirport(route.origin),
      this.encodeAirport(route.destination),
      date.getDay(),
      date.getMonth(),
      this.isHoliday(date),
      this.getAdvancePurchaseDays(date),
      this.getHistoricalLoadFactor(route, date),
    ]]);
    
    // Fazer predição
    const prediction = this.model.predict(features) as tf.Tensor;
    const probability = await prediction.data();
    
    return {
      probability: probability[0],
      confidence: this.calculateConfidence(prediction),
      recommendation: this.getRecommendation(probability[0]),
    };
  }
  
  private prepareFeatures(data: TrainingData[]): tf.Tensor2D {
    return tf.tensor2d(
      data.map(item => [
        this.encodeAirport(item.route.origin),
        this.encodeAirport(item.route.destination),
        new Date(item.date).getDay(),
        new Date(item.date).getMonth(),
        this.isHoliday(new Date(item.date)),
        item.advancePurchaseDays,
        item.historicalLoadFactor,
      ])
    );
  }
  
  private prepareLabels(data: TrainingData[]): tf.Tensor2D {
    return tf.tensor2d(data.map(item => [item.available ? 1 : 0]));
  }
}
```

#### Preditor de Valor de Pontos

```typescript
// lib/ml/value-predictor.ts
export class PointValuePredictor {
  async predictPointValue(
    program: string,
    redemptionType: string,
    route?: Route
  ): Promise<number> {
    // Modelo baseado em regressão
    const features = this.extractFeatures(program, redemptionType, route);
    
    // Usar modelo treinado ou heurísticas
    const baseValue = await this.getBaseValue(program);
    const multiplier = this.getRouteMultiplier(route);
    const seasonalAdjustment = this.getSeasonalAdjustment();
    
    return baseValue * multiplier * seasonalAdjustment;
  }
  
  private async getBaseValue(program: string): Promise<number> {
    // Buscar valor médio histórico
    const values = await prisma.pointValue.findMany({
      where: {
        program: { name: program },
        valueType: 'average',
        scrapedAt: { gte: new Date(Date.now() - 90 * 24 * 3600 * 1000) },
      },
      orderBy: { scrapedAt: 'desc' },
      take: 10,
    });
    
    if (values.length === 0) return 1.0; // Default
    
    const avg = values.reduce((sum, v) => sum + v.value, 0) / values.length;
    return avg;
  }
  
  private getRouteMultiplier(route?: Route): number {
    if (!route) return 1.0;
    
    // Rotas premium têm multiplicadores maiores
    const premiumRoutes = [
      { origin: 'JFK', destination: 'LHR', multiplier: 1.5 },
      { origin: 'LAX', destination: 'NRT', multiplier: 1.8 },
      { origin: 'SFO', destination: 'SYD', multiplier: 1.6 },
    ];
    
    const premium = premiumRoutes.find(
      r => r.origin === route.origin && r.destination === route.destination
    );
    
    return premium?.multiplier || 1.0;
  }
}
```

### 2. Análise de Sentimento

```typescript
// lib/ml/sentiment-analyzer.ts
export class SentimentAnalyzer {
  async analyzeCreditCardReviews(reviews: string[]): Promise<SentimentAnalysis> {
    // Usar modelo pré-treinado ou API
    const results = await Promise.all(
      reviews.map(review => this.analyzeSentiment(review))
    );
    
    const avgSentiment = results.reduce((sum, r) => sum + r.score, 0) / results.length;
    
    return {
      overallSentiment: avgSentiment,
      positiveCount: results.filter(r => r.label === 'positive').length,
      negativeCount: results.filter(r => r.label === 'negative').length,
      neutralCount: results.filter(r => r.label === 'neutral').length,
      keyTopics: this.extractKeyTopics(results),
    };
  }
  
  private async analyzeSentiment(text: string): Promise<SentimentResult> {
    // Usar OpenAI ou Hugging Face
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Analyze the sentiment of this credit card review. Return JSON with "label" (positive, negative, neutral) and "score" (-1 to 1).'
        },
        { role: 'user', content: text }
      ],
      response_format: { type: 'json_object' },
    });
    
    return JSON.parse(response.choices[0]?.message?.content || '{}');
  }
}
```

---

## 📊 ANÁLISES E RELATÓRIOS

### 1. Dashboard de Dados

```typescript
// lib/analytics/scraping-dashboard.ts
export class ScrapingAnalytics {
  async getDashboardMetrics(): Promise<ScrapingMetrics> {
    const [totalItems, successRate, avgProcessingTime] = await Promise.all([
      this.getTotalItemsScraped(),
      this.getSuccessRate(),
      this.getAvgProcessingTime(),
    ]);
    
    return {
      totalItems,
      successRate,
      avgProcessingTime,
      sources: await this.getSourceMetrics(),
      dataQuality: await this.getDataQualityMetrics(),
      trends: await this.getTrendingData(),
    };
  }
  
  private async getSourceMetrics(): Promise<SourceMetrics[]> {
    return prisma.$queryRaw<SourceMetrics[]>`
      SELECT 
        source,
        COUNT(*) as total_items,
        AVG(duration_ms) as avg_duration,
        COUNT(CASE WHEN status = 'success' THEN 1 END) * 100.0 / COUNT(*) as success_rate,
        MAX(scraped_at) as last_scraped
      FROM scraping_logs
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY source
      ORDER BY total_items DESC
    `;
  }
  
  async getDataQualityReport(): Promise<DataQualityReport> {
    const report: DataQualityReport = {
      completeness: await this.calculateCompleteness(),
      accuracy: await this.calculateAccuracy(),
      freshness: await this.calculateFreshness(),
      consistency: await this.calculateConsistency(),
    };
    
    return report;
  }
  
  private async calculateCompleteness(): Promise<number> {
    const requiredFields = [
      'name', 'issuer', 'annual_fee', 'welcome_bonus'
    ];
    
    const completeness = await prisma.$queryRaw<CompletenessResult[]>`
      SELECT 
        ${requiredFields.map(field => `
          COUNT(CASE WHEN ${field} IS NOT NULL THEN 1 END) * 100.0 / COUNT(*) as ${field}_completeness
        `).join(', ')}
      FROM credit_cards
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `;
    
    const avgCompleteness = Object.values(completeness[0] || {})
      .reduce((sum, val) => sum + (val || 0), 0) / requiredFields.length;
    
    return avgCompleteness;
  }
}
```

### 2. Alertas de Qualidade

```typescript
// lib/quality/alerts.ts
export class DataQualityAlerts {
  async checkDataQuality(): Promise<QualityAlert[]> {
    const alerts: QualityAlert[] = [];
    
    // Verificar dados desatualizados
    const staleData = await this.findStaleData();
    if (staleData.length > 0) {
      alerts.push({
        type: 'stale_data',
        severity: 'high',
        message: `${staleData.length} items have stale data`,
        details: staleData,
      });
    }
    
    // Verificar inconsistências
    const inconsistencies = await this.findInconsistencies();
    if (inconsistencies.length > 0) {
      alerts.push({
        type: 'inconsistency',
        severity: 'medium',
        message: 'Data inconsistencies detected',
        details: inconsistencies,
      });
    }
    
    // Verificar scraping failures
    const failures = await this.findScrapingFailures();
    if (failures.length > 5) {
      alerts.push({
        type: 'scraping_failure',
        severity: 'high',
        message: `High number of scraping failures: ${failures.length}`,
        details: failures,
      });
    }
    
    return alerts;
  }
  
  private async findStaleData(): Promise<StaleData[]> {
    const staleThreshold = new Date(Date.now() - 7 * 24 * 3600 * 1000);
    
    const staleCreditCards = await prisma.creditCard.findMany({
      where: {
        lastScrapedAt: { lt: staleThreshold },
      },
      select: { id: true, name: true, lastScrapedAt: true },
    });
    
    const stalePointValues = await prisma.pointValue.findMany({
      where: {
        scrapedAt: { lt: staleThreshold },
      },
      select: { id: true, programId: true, scrapedAt: true },
    });
    
    return [
      ...staleCreditCards.map(card => ({
        type: 'credit_card',
        id: card.id,
        name: card.name,
        lastUpdated: card.lastScrapedAt,
      })),
      ...stalePointValues.map(value => ({
        type: 'point_value',
        id: value.id,
        programId: value.programId,
        lastUpdated: value.scrapedAt,
      })),
    ];
  }
}
```

---

## 🚀 SCALING E PERFORMANCE

### 1. Horizontal Scaling

```yaml
# kubernetes/scraping-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: milesai-scraper
spec:
  replicas: 5
  selector:
    matchLabels:
      app: milesai-scraper
  template:
    metadata:
      labels:
        app: milesai-scraper
    spec:
      containers:
      - name: scraper
        image: milesai/scraper:latest
        env:
        - name: NODE_ENV
          value: "production"
        - name: REDIS_HOST
          value: "redis-service"
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: milesai-scraper-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: milesai-scraper
  minReplicas: 2
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### 2. Rate Limiting

```typescript
// lib/rate-limiter/strategies.ts
export class RateLimiterFactory {
  static createLimiter(type: string): RateLimiter {
    switch (type) {
      case 'tpg':
        return new TokenBucketLimiter({
          capacity: 100,
          refillRate: 10,
          refillInterval: 'minute',
        });
        
      case 'daily-drop':
        return new SlidingWindowLimiter({
          window: 'hour',
          maxRequests: 60,
        });
        
      case 'award-wallet':
        return new FixedWindowLimiter({
          window: 'day',
          maxRequests: 1000,
        });
        
      default:
        return new TokenBucketLimiter({
          capacity: 50,
          refillRate: 5,
          refillInterval: 'minute',
        });
    }
  }
}
```

### 3. Retry Strategies

```typescript
// lib/retry/strategies.ts
export class RetryStrategies {
  static exponentialBackoff(
    attempt: number,
    baseDelay: number = 1000
  ): number {
    return Math.min(baseDelay * Math.pow(2, attempt), 30000);
  }
  
  static linearBackoff(
    attempt: number,
    baseDelay: number = 1000
  ): number {
    return baseDelay * attempt;
  }
  
  static withJitter(delay: number): number {
    const jitter = Math.random() * 0.1 * delay;
    return delay + (Math.random() > 0.5 ? jitter : -jitter);
  }
  
  static shouldRetry(error: Error, attempt: number): boolean {
    if (attempt >= 5) return false;
    
    const retryableErrors = [
      'ECONNRESET',
      'ETIMEDOUT',
      'ENOTFOUND',
      'ECONNREFUSED',
    ];
    
    return retryableErrors.some(code => error.message.includes(code));
  }
}
```

---

## 🔒 SEGURANÇA E COMPLIANCE

### 1. Data Privacy

```typescript
// lib/privacy/gdpr.ts
export class GDPRCompliance {
  async anonymizeUserData(userId: string): Promise<void> {
    await prisma.$transaction([
      // Anonymize personal data
      prisma.user.update({
        where: { id: userId },
        data: {
          email: this.hashEmail(user.email),
          firstName: 'GDPR',
          lastName: 'Anonymized',
          phone: null,
        },
      }),
      
      // Delete sensitive data
      prisma.userPreference.deleteMany({
        where: { userId },
      }),
      
      // Anonymize tracking data
      prisma.analyticsEvent.updateMany({
        where: { userId },
        data: { userId: 'anonymized' },
      }),
    ]);
  }
  
  async exportUserData(userId: string): Promise<UserDataExport> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscriptions: true,
        transactions: true,
        preferences: true,
        analyticsEvents: true,
      },
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return {
      personalData: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
      },
      subscriptions: user.subscriptions,
      transactions: user.transactions,
      preferences: user.preferences,
      activity: user.analyticsEvents,
    };
  }
}
```

### 2. Rate Limiting por IP

```typescript
// lib/security/rate-limit.ts
export class SecurityRateLimiter {
  private redis: Redis;
  
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: 6379,
      db: 1, // DB separado para security
    });
  }
  
  async checkRateLimit(
    ip: string,
    endpoint: string,
    limit: number = 100,
    window: number = 3600
  ): Promise<RateLimitResult> {
    const key = `rate_limit:${endpoint}:${ip}`;
    
    const current = await this.redis.incr(key);
    
    if (current === 1) {
      await this.redis.expire(key, window);
    }
    
    const ttl = await this.redis.ttl(key);
    
    return {
      allowed: current <= limit,
      remaining: Math.max(0, limit - current),
      resetTime: Date.now() + (ttl * 1000),
    };
  }
  
  async blockIP(ip: string, reason: string, duration: number = 86400): Promise<void> {
    const key = `blocked_ip:${ip}`;
    await this.redis.setex(key, duration, reason);
  }
  
  async isBlocked(ip: string): Promise<boolean> {
    const result = await this.redis.exists(`blocked_ip:${ip}`);
    return result === 1;
  }
}
```

---

## 📊 MÉTRICAS E MONITORAMENTO

### 1. Dashboard de Scraping

```typescript
// lib/monitoring/scraping-metrics.ts
export class ScrapingMetrics {
  async collectMetrics(): Promise<ScrapingReport> {
    return {
      throughput: await this.calculateThroughput(),
      latency: await this.calculateLatency(),
      errorRate: await this.calculateErrorRate(),
      dataQuality: await this.assessDataQuality(),
      cost: await this.calculateCost(),
    };
  }
  
  private async calculateThroughput(): Promise<number> {
    const itemsLastHour = await prisma.scrapingLog.count({
      where: {
        createdAt: { gte: new Date(Date.now() - 3600 * 1000) },
        status: 'success',
      },
    });
    
    return itemsLastHour;
  }
  
  private async calculateErrorRate(): Promise<number> {
    const last24Hours = await prisma.scrapingLog.findMany({
      where: {
        createdAt: { gte: new Date(Date.now() - 24 * 3600 * 1000) },
      },
    });
    
    const errors = last24Hours.filter(log => log.status === 'error').length;
    const total = last24Hours.length;
    
    return total > 0 ? (errors / total) * 100 : 0;
  }
  
  async sendMetricsToPrometheus(): Promise<void> {
    const metrics = await this.collectMetrics();
    
    // Enviar para Prometheus
    await fetch(`${process.env.PROMETHEUS_PUSHGATEWAY}/metrics/job/scraping`, {
      method: 'POST',
      body: `
        # HELP scraping_throughput_items_per_hour Number of items scraped per hour
        # TYPE scraping_throughput_items_per_hour gauge
        scraping_throughput_items_per_hour ${metrics.throughput}
        
        # HELP scraping_error_rate_percentage Error rate percentage
        # TYPE scraping_error_rate_percentage gauge
        scraping_error_rate_percentage ${metrics.errorRate}
        
        # HELP scraping_data_quality_score Data quality score (0-1)
        # TYPE scraping_data_quality_score gauge
        scraping_data_quality_score ${metrics.dataQuality}
      `,
    });
  }
}
```

### 2. Alertas de Sistema

```typescript
// lib/monitoring/alerts.ts
export class SystemAlerts {
  async checkSystemHealth(): Promise<HealthCheckResult> {
    const checks = await Promise.all([
      this.checkDatabase(),
      this.checkRedis(),
      this.checkScrapingQueue(),
      this.checkDiskSpace(),
      this.checkMemoryUsage(),
    ]);
    
    const isHealthy = checks.every(check => check.healthy);
    
    if (!isHealthy) {
      await this.sendAlert({
        severity: 'high',
        message: 'System health check failed',
        details: checks.filter(c => !c.healthy),
      });
    }
    
    return {
      healthy: isHealthy,
      checks: checks,
      timestamp: new Date(),
    };
  }
  
  private async checkScrapingQueue(): Promise<HealthCheck> {
    const queueSize = await this.getQueueSize('scraping');
    
    return {
      name: 'scraping_queue',
      healthy: queueSize < 10000,
      details: { queueSize },
    };
  }
  
  private async sendAlert(alert: Alert): Promise<void> {
    // Slack notification
    await this.sendSlackAlert(alert);
    
    // Email para equipe
    await this.sendEmailAlert(alert);
    
    // PagerDuty para severidade alta
    if (alert.severity === 'high') {
      await this.triggerPagerDuty(alert);
    }
  }
}
```

---

## 🎯 CONCLUSÃO

A arquitetura de scraping e dados do MilesAI foi projetada para:

1. **Escala**: Processar milhões de dados por mês
2. **Confiabilidade**: 99.9% de uptime
3. **Qualidade**: Dados precisos e atualizados
4. **Performance**: Respostas em <100ms
5. **Compliance**: GDPR e termos de uso respeitados

### KPIs de Dados

| Métrica | Meta | Atual |
|---------|------|-------|
| Dados atualizados | <1 hora | - |
| Taxa de erro | <0.1% | - |
| Cobertura | 95% | - |
| Precisão | 99% | - |
| Latência | <100ms | - |

### Infraestrutura Necessária

- **Servidores**: 5-10 instâncias para scraping
- **Banco**: PostgreSQL cluster (master + replicas)
- **Cache**: Redis cluster (3 nodes)
- **Filas**: Bull Queue com Redis
- **Storage**: S3 para dados brutos
- **ML**: GPU instances para treinamento

### Custo Estimado Mensal

| Item | Custo |
|------|-------|
| Servidores scraping | $2,000 |
| Banco de dados | $1,500 |
| Redis cluster | $500 |
| S3 storage | $300 |
| Proxies | $1,000 |
| ML/GPU | $1,000 |
| Monitoramento | $200 |
| **Total** | **$6,500** |

### ROI Esperado

Com dados de qualidade, podemos:
- Aumentar conversão em 25%
- Reduzir churn em 30%
- Melhorar LTV em 40%
- ROI de 10x no primeiro ano

**Dados de qualidade são o coração do MilesAI! 📊**