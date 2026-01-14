# MilesAI - Produtos Digitais: Ebooks e Cursos

## 🎯 VISÃO GERAL

Sistema completo de criação, gestão e monetização de produtos digitais educacionais sobre milhas e viagens, utilizando IA para geração de conteúdo, design e produção em escala.

---

## 📚 ESTRUTURA DE PRODUTOS

### 1. EBOOKS

#### 1.1 Portfólio de Ebooks

**Ebook 1: "Guia Definitivo: Primeira Viagem com Pontos"**
- **Páginas:** 45-60
- **Nível:** Iniciante
- **Preço:** $29 (grátis como lead magnet)
- **Conteúdo:**
  - Introdução ao mundo das milhas
  - Como começar do zero
  - Primeiros passos com cartões
  - Estratégias básicas de acúmulo
  - Redenção simples
  - Casos reais de sucesso

**Ebook 2: "Maximizando suas Milhas: Estratégias Avançadas"**
- **Páginas:** 80-100
- **Nível:** Intermediário/Avançado
- **Preço:** $49
- **Conteúdo:**
  - Transfer partners otimizados
  - Sweet spots por programa
  - Manufactured spending
  - Credit card churning
  - Status matches
  - Booking complexo
  - Impostos e estratégias fiscais

**Ebook 3: "Business Class & First Class: O Guia Completo"**
- **Páginas:** 60-75
- **Nível:** Avançado
- **Preço:** $39
- **Conteúdo:**
  - Produtos premium por companhia
  - Rotas e aeronaves
  - Lounges e experiências
  - Booking estratégico
  - Upgrades e waitlists
  - Avaliações detalhadas

**Ebook 4: "Famílias e Milhas: Viajando com Crianças de Graça"**
- **Páginas:** 50-65
- **Nível:** Iniciante/Intermediário
- **Preço:** $34
- **Conteúdo:**
  - Estratégias familiares
  - Companion passes
  - Programas infantis
  - Documentação e vistos
  - Dicas práticas de viagem

**Ebook 5: "Milhas para Negócios: Empreendedores e Freelancers"**
- **Páginas:** 55-70
- **Nível:** Intermediário
- **Preço:** $44
- **Conteúdo:**
  - Cartões business
  - Deductions fiscais
  - Reimbursement strategies
  - Corporate programs
  - T&E optimization

#### 1.2 Processo de Criação de Ebooks

**ETAPA 1: Research e Coleta de Dados**

```typescript
// scripts/ebook-research.ts
import { scrapeSources } from './scraper';
import { generateOutline } from './outline-generator';

interface EbookResearch {
  topic: string;
  targetAudience: string;
  sources: string[];
  keywords: string[];
  competitors: string[];
}

export async function researchEbookContent(config: EbookResearch) {
  // 1. Scraping de fontes relevantes
  const scrapedData = await scrapeSources(config.sources);
  
  // 2. Análise de concorrentes
  const competitorAnalysis = await analyzeCompetitors(config.competitors);
  
  // 3. Keyword research
  const keywordData = await performKeywordResearch(config.keywords);
  
  // 4. Gerar outline baseado na pesquisa
  const outline = await generateOutline({
    topic: config.topic,
    audience: config.targetAudience,
    data: scrapedData,
    competitors: competitorAnalysis,
    keywords: keywordData,
  });
  
  return {
    outline,
    researchData: scrapedData,
    keywords: keywordData,
    competitorInsights: competitorAnalysis,
  };
}

// Fontes de scraping para ebooks
const EBOOK_SOURCES = {
  'primeira-viagem': [
    'https://thepointsguy.com/guide/',
    'https://onemileatatime.com/guides/',
    'https://www.dailydrop.com/course-videos/',
    'https://awardwallet.com/blog/',
  ],
  'estragegias-avancadas': [
    'https://www.doctorofcredit.com/',
    'https://frequentmiler.com/',
    'https://www.loyaltylobby.com/',
    'https://blackhatworld.com/',
  ],
};
```

**ETAPA 2: Geração de Conteúdo com IA**

```typescript
// scripts/ebook-generator.ts
import { OpenAI } from 'openai';
import { generatePDF } from './pdf-generator';

export class EbookGenerator {
  private openai: OpenAI;
  
  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }
  
  async generateChapter(
    outline: OutlineItem,
    researchData: any,
    chapterIndex: number,
    totalChapters: number
  ): Promise<string> {
    const prompt = `
    Você é um expert em milhas e viagens escrevendo um ebook sobre "${outline.parentTopic}".
    
    ESCREVA O CAPÍTULO ${chapterIndex} de ${totalChapters}: "${outline.title}"
    
    PÚBLICO-ALVO: ${outline.targetAudience}
    NÍVEL: ${outline.level}
    
    CONTEXTUALIZAÇÃO:
    - Tópico principal: ${outline.parentTopic}
    - Objetivo do capítulo: ${outline.objective}
    - Pontos-chave a cobrir: ${outline.keyPoints.join(', ')}
    
    INSTRUÇÕES:
    1. Escreva em português brasileiro
    2. Use tom conversacional mas profissional
    3. Inclua exemplos práticos e números reais
    4. Adicione dês e callouts quando relevante
    5. Mantenha parágrafos curtos (3-5 linhas)
    6. Use markdown para formatação
    7. Inclua tabelas comparativas quando útil
    8. Adicione "Pro Tips" em caixas destacadas
    
    CONTEÚDO BASE (use como referência, não copie):
    ${JSON.stringify(researchData[chapterIndex - 1], null, 2)}
    
    FORMATO DE SAÍDA:
    - Comece com um título H2 (##)
    - Use H3 para subseções
    - Inclua introdução e conclusão do capítulo
    - Adicione exercícios práticos no final
    - Formato: Markdown
    
    Extensão alvo: ${outline.targetWords} palavras
    `;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em travel hacking e milhas aéreas. Escreva conteúdo educacional claro, prático e engajante.'
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0]?.message?.content || '';
  }
  
  async generateEbook(config: EbookConfig): Promise<EbookContent> {
    const chapters: string[] = [];
    
    // Gerar introdução
    const introduction = await this.generateIntroduction(
      config.title,
      config.targetAudience,
      config.objectives
    );
    chapters.push(introduction);
    
    // Gerar capítulos
    for (let i = 0; i < config.outline.length; i++) {
      const chapter = await this.generateChapter(
        config.outline[i],
        config.researchData,
        i + 1,
        config.outline.length
      );
      chapters.push(chapter);
    }
    
    // Gerar conclusão
    const conclusion = await this.generateConclusion(
      config.title,
      config.nextSteps
    );
    chapters.push(conclusion);
    
    return {
      title: config.title,
      subtitle: config.subtitle,
      author: config.author,
      chapters,
      metadata: {
        wordCount: chapters.reduce((acc, chapter) => acc + countWords(chapter), 0),
        pageCount: Math.ceil(chapters.reduce((acc, chapter) => acc + countWords(chapter), 0) / 250),
        createdAt: new Date(),
      },
    };
  }
  
  private async generateIntroduction(
    title: string,
    audience: string,
    objectives: string[]
  ): Promise<string> {
    const prompt = `
    Escreva a introdução para o ebook "${title}".
    
    PÚBLICO-ALVO: ${audience}
    OBJETIVOS DO EBOOK:
    ${objectives.map(obj => `- ${obj}`).join('\n')}
    
    A introdução deve:
    1. Hook imediato - pegar atenção do leitor
    2. Estabelecer credibilidade
    3. Preview do que ele vai aprender
    4. Por que este ebook é diferente
    5. Como usar o ebook
    
    Formato: Markdown, 800-1200 palavras
    `;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: 'Você é um expert copywriter especializado em ebooks de viagem.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 1500,
    });

    return response.choices[0]?.message?.content || '';
  }
}
```

**ETAPA 3: Design e Layout**

```typescript
// scripts/ebook-designer.ts
import { generateCover } from './cover-generator';
import { createPDF } from './pdf-creator';

export interface EbookDesign {
  title: string;
  subtitle: string;
  author: string;
  template: 'modern' | 'classic' | 'minimal';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export class EbookDesigner {
  async designCover(config: EbookDesign): Promise<Buffer> {
    const prompt = `
    Create a professional ebook cover for "${config.title}".
    
    THEME: Travel rewards and credit card points
    STYLE: ${config.template}
    COLORS: Primary ${config.colors.primary}, Secondary ${config.colors.secondary}
    
    The cover should include:
    - Title: "${config.title}"
    - Subtitle: "${config.subtitle}"
    - Author: "${config.author}"
    - Professional travel/airline imagery
    - Clean, modern typography
    - High contrast for readability
    
    Dimensions: 1600x2560px (ebook cover)
    Format: PNG
    Style: Professional, trustworthy, premium
    `;

    // Usar DALL-E para gerar capa
    const response = await this.openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size: '1024x1024',
      quality: 'standard',
      style: 'vivid',
    });

    // Download e processar imagem
    const imageUrl = response.data[0]?.url;
    if (imageUrl) {
      return this.downloadAndProcessImage(imageUrl);
    }

    throw new Error('Failed to generate cover image');
  }
  
  async createPDF(
    content: EbookContent,
    design: EbookDesign,
    cover: Buffer
  ): Promise<Buffer> {
    const pdf = new PDFDocument({
      size: 'A4',
      margin: 50,
    });

    const buffers: Buffer[] = [];
    pdf.on('data', buffers.push.bind(buffers));

    // Capa
    pdf.image(cover, 0, 0, { width: 595, height: 842 });
    pdf.addPage();

    // Página de título
    this.addTitlePage(pdf, content, design);
    
    // Índice
    this.addTableOfContents(pdf, content);
    
    // Conteúdo
    for (const chapter of content.chapters) {
      this.addChapter(pdf, chapter, design);
    }

    // Sobre o autor
    this.addAuthorPage(pdf, content.author);

    pdf.end();

    return Buffer.concat(buffers);
  }
  
  private addTitlePage(pdf: PDFDocument, content: EbookContent, design: EbookDesign) {
    // Título
    pdf.fontSize(36)
       .fillColor(design.colors.primary)
       .text(content.title, 50, 200, { align: 'center' });
    
    // Subtítulo
    if (content.subtitle) {
      pdf.fontSize(18)
         .fillColor(design.colors.secondary)
         .text(content.subtitle, 50, 300, { align: 'center' });
    }
    
    // Autor
    pdf.fontSize(14)
       .fillColor('#666666')
       .text(`por ${content.author}`, 50, 400, { align: 'center' });
    
    // Ano
    pdf.fontSize(12)
       .fillColor('#999999')
       .text(`© ${new Date().getFullYear()}`, 50, 500, { align: 'center' });
  }
}
```

**ETAPA 4: Geração de PDF Final**

```typescript
// scripts/ebook-publisher.ts
export class EbookPublisher {
  private generator: EbookGenerator;
  private designer: EbookDesigner;
  
  async publishEbook(config: PublishConfig): Promise<PublishedEbook> {
    // 1. Research
    console.log('🔍 Iniciando research...');
    const research = await researchEbookContent({
      topic: config.topic,
      targetAudience: config.targetAudience,
      sources: EBOOK_SOURCES[config.topic] || [],
      keywords: config.keywords,
      competitors: config.competitors,
    });
    
    // 2. Generate content
    console.log('🤖 Gerando conteúdo com IA...');
    const ebookContent = await this.generator.generateEbook({
      title: config.title,
      subtitle: config.subtitle,
      author: config.author,
      targetAudience: config.targetAudience,
      outline: config.outline,
      researchData: research.researchData,
      objectives: config.objectives,
      nextSteps: config.nextSteps,
    });
    
    // 3. Design
    console.log('🎨 Criando design...');
    const design: EbookDesign = {
      title: config.title,
      subtitle: config.subtitle,
      author: config.author,
      template: config.template || 'modern',
      colors: config.colors || {
        primary: '#1a365d',
        secondary: '#d69e2e',
        accent: '#2b6cb0',
      },
      fonts: config.fonts || {
        heading: 'Inter',
        body: 'Inter',
      },
    };
    
    const cover = await this.designer.designCover(design);
    
    // 4. Create PDF
    console.log('📄 Gerando PDF...');
    const pdf = await this.designer.createPDF(ebookContent, design, cover);
    
    // 5. Save and upload
    console.log('☁️ Fazendo upload...');
    const s3Url = await this.uploadToS3(
      pdf,
      `ebooks/${config.slug}/ebook.pdf`
    );
    
    // 6. Create database record
    const ebookRecord = await prisma.ebook.create({
      data: {
        title: config.title,
        slug: config.slug,
        subtitle: config.subtitle,
        author: config.author,
        description: config.description,
        price: config.price,
        isFree: config.isFree || false,
        wordCount: ebookContent.metadata.wordCount,
        pageCount: ebookContent.metadata.pageCount,
        downloadUrl: s3Url,
        coverUrl: await this.uploadCover(cover, config.slug),
        metadata: {
          keywords: research.keywords,
          competitorAnalysis: research.competitorInsights,
        },
      },
    });
    
    // 7. Generate landing page
    await this.generateLandingPage(ebookRecord);
    
    console.log('✅ Ebook publicado com sucesso!');
    
    return {
      ebook: ebookRecord,
      content: ebookContent,
      metrics: {
        generationTime: Date.now() - startTime,
        wordCount: ebookContent.metadata.wordCount,
        pageCount: ebookContent.metadata.pageCount,
      },
    };
  }
  
  private async uploadToS3(buffer: Buffer, key: string): Promise<string> {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: 'application/pdf',
      ACL: 'public-read',
    };
    
    const result = await s3.upload(params).promise();
    return result.Location;
  }
}
```

### 2. CURSOS

#### 2.1 Estrutura de Cursos

**Curso 1: "Miles & Points 101" (Gratuito)**

```yaml
# courses/miles-points-101/course.yaml
title: "Miles & Points 101: Do Zero ao Seu Primeiro Voo Grátis"
slug: miles-points-101
level: iniciante
price: 0
isFree: true
duration: 180 # minutos
objectives:
  - "Entender o ecossistema de milhas e pontos"
  - "Escolher os primeiros cartões de crédito"
  - "Acumular pontos de forma estratégica"
  - "Fazer a primeira redenção"
  - "Planejar viagens futuras com milhas"

modules:
  - id: modulo-1
    title: "Introdução ao Mundo das Milhas"
    order: 1
    lessons:
      - id: aula-1-1
        title: "O Que São Milhas e Pontos?"
        duration: 8
        type: video
        content: |
          ## O Que São Milhas e Pontos?
          
          Milhas e pontos são moedas virtuais que você acumula e pode trocar por:
          - Voos gratuitos
          - Upgrades de classe
          - Hotéis
          - Experiências
          
          ### Tipos de Programas
          
          **Programas de Companhias Aéreas:**
          - American AAdvantage
          - Delta SkyMiles
          - United MileagePlus
          - Southwest Rapid Rewards
          
          **Programas de Hotéis:**
          - Marriott Bonvoy
          - Hilton Honors
          - World of Hyatt
          - IHG One Rewards
          
          **Programas de Cartões:**
          - Chase Ultimate Rewards
          - Amex Membership Rewards
          - Citi ThankYou Points
          - Capital One Miles
          
          ### Como Funcionam?
          
          1. **Acúmulo:** Ganhe pontos através de:
             - Voos e hospedagens
             - Gastos em cartões de crédito
             - Promoções e bônus
             - Shopping portals
          
          2. **Redenção:** Use pontos para:
             - Resgatar voos (award flights)
             - Bookar hotéis
             - Transferir para parceiros
             - Cash back
          
          ### Dica de Ouro 💡
          
          Nem todos os pontos são iguais! Um ponto Chase UR pode valer muito mais
          que um ponto de um programa de companhia aérea, graças aos parceiros de transferência.
          
          ### Exercício
          
          Liste 3 programas de pontos que você já ouviu falar e pesquise:
          1. Quanto custa para juntar pontos suficientes para um voo nacional
          2. Quais são os parceiros de transferência
          3. Se há alguma promoção ativa
        
      - id: aula-1-2
        title: "O Ecossistema de Travel Hacking"
        duration: 12
        type: video
        content: ...
        
      - id: aula-1-3
        title: "Mitos e Verdades sobre Milhas"
        duration: 10
        type: video
        content: ...
        
    quiz:
      - question: "Qual é a principal vantagem dos pontos transferíveis?"
        options:
          - "Não expiram nunca"
          - "Podem ser transferidos para múltiplos parceiros"
          - "São mais fáceis de acumular"
          - "Têm valor fixo"
        correct: 1
        
      - question: "Quantos pontos você precisa para um voo doméstico?"
        options:
          - "5,000 - 15,000"
          - "25,000 - 50,000"
          - "100,000 - 200,000"
          - "Depende do programa e disponibilidade"
        correct: 3

  - id: modulo-2
    title: "Cartões de Crédito: Seu Melhor Amigo"
    order: 2
    lessons:
      - id: aula-2-1
        title: "Tipos de Cartões de Recompensas"
        duration: 15
        type: video
        content: ...
        
      - id: aula-2-2
        title: "Bônus de Boas-Vindas: O Santo Graal"
        duration: 18
        type: video
        content: ...
        
      - id: aula-2-3
        title: "Impacto no Score de Crédito"
        duration: 12
        type: video
        content: ...
        
  - id: modulo-3
    title: "Acumulando Pontos Estrategicamente"
    order: 3
    lessons:
      - id: aula-3-1
        title: "Categorias de Bônus Maximizadas"
        duration: 20
        type: video
        content: ...
        
      - id: aula-3-2
        title: "Shopping Portals: Dinheiro Grátis"
        duration: 14
        type: video
        content: ...
        
      - id: aula-3-3
        title: "Referrals e Promoções"
        duration: 10
        type: video
        content: ...
        
  - id: modulo-4
    title: "Sua Primeira Redenção"
    order: 4
    lessons:
      - id: aula-4-1
        title: "Encontrando Disponibilidade"
        duration: 22
        type: video
        content: ...
        
      - id: aula-4-2
        title: "Transferindo Pontes"
        duration: 16
        type: video
        content: ...
        
      - id: aula-4-3
        title: "Bookando Seu Primeiro Award"
        duration: 25
        type: video
        content: ...
        
  - id: modulo-5
    title: "Próximos Passos e Estratégias"
    order: 5
    lessons:
      - id: aula-5-1
        title: "Planejando Suas Próximas Viagens"
        duration: 18
        type: video
        content: ...
        
      - id: aula-5-2
        title: "Erros Comuns e Como Evitar"
        duration: 15
        type: video
        content: ...
        
      - id: aula-5-3
        title: "Certificado de Conclusão"
        duration: 5
        type: completion
        content: |
          Parabéns! 🎉
          
          Você completou o curso Miles & Points 101 e agora tem o conhecimento
          necessário para começar sua jornada no mundo das milhas e pontos.
          
          ## O Que Você Aprendeu
          
          ✓ O ecossistema completo de travel hacking
          ✓ Como escolher e usar cartões de crédito estrategicamente
          ✓ Técnicas de acúmulo maximizado
          ✓ Como fazer sua primeira redenção
          ✓ Estratégias para próximas viagens
          
          ## Próximos Passos
          
          1. **Defina sua meta de viagem** - Escolha um destino e datas
          2. **Comece a acumular pontos** - Solicite seu primeiro cartão
          3. **Junte-se à comunidade** - MilesAI Community
          4. **Continue aprendendo** - Cursos avançados disponíveis
          
          ## Seu Certificado
          
          Clique no botão abaixo para baixar seu certificado de conclusão!
          
          [Baixar Certificado]
          
          Boa sorte em suas próximas aventuras! ✈️
```

**Curso 2: "Advanced Travel Hacking Masterclass" (Pago - $297)**

```yaml
title: "Advanced Travel Hacking Masterclass"
slug: advanced-masterclass
level: avancado
price: 297
isFree: false
duration: 480 # minutos
modules:
  - id: advanced-1
    title: "Manufactured Spending Fundamentals"
    lessons:
      - title: "Intro to MS"
        duration: 25
      - title: "Gift Card Strategies"
        duration: 35
      - title: "Money Orders"
        duration: 30
      - title: "Advanced MS Techniques"
        duration: 40
        
  - id: advanced-2
    title: "Credit Card Churning Like a Pro"
    lessons:
      - title: "Application Strategies"
        duration: 45
      - title: "5/24 and Other Rules"
        duration: 35
      - title: "Business Cards"
        duration: 40
      - title: "Shutdown Prevention"
        duration: 30
        
  - id: advanced-3
    title: "Award Booking Mastery"
    lessons:
      - title: "Complex Routings"
        duration: 50
      - title: "Stopovers and Open Jaws"
        duration: 40
      - title: "Fifth Freedom Routes"
        duration: 35
      - title: "Round-the-World Awards"
        duration: 45
        
  - id: advanced-4
    title: "Status and Elite Benefits"
    lessons:
      - title: "Hotel Status Strategies"
        duration: 30
      - title: "Airline Status Matches"
        duration: 35
      - title: "Credit Card Status"
        duration: 25
      - title: "Maximizing Benefits"
        duration: 40
        
  - id: advanced-5
    title: "Taxes and Legal Considerations"
    lessons:
      - title: "Business Deductions"
        duration: 40
      - title: "1099s and Income"
        duration: 35
      - title: "International Considerations"
        duration: 30
```

#### 2.2 Geração Automática de Vídeos

```typescript
// scripts/video-generator.ts
import { createCanvas } from 'canvas';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class VideoGenerator {
  async generateVideoFromScript(
    script: string,
    config: VideoConfig
  ): Promise<string> {
    // 1. Gerar slides baseado no script
    const slides = await this.generateSlides(script, config);
    
    // 2. Criar narração com IA
    const narration = await this.generateNarration(script, config.voice);
    
    // 3. Gerar animações
    const animations = await this.createAnimations(slides);
    
    // 4. Combinar tudo em vídeo
    const videoPath = await this.combineVideo(
      slides,
      narration,
      animations,
      config
    );
    
    return videoPath;
  }
  
  private async generateSlides(script: string, config: VideoConfig) {
    const sections = this.parseScriptIntoSections(script);
    const slides = [];
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const slide = await this.createSlide(section, i, config);
      slides.push(slide);
    }
    
    return slides;
  }
  
  private async createSlide(
    section: ScriptSection,
    index: number,
    config: VideoConfig
  ): Promise<Slide> {
    const canvas = createCanvas(1920, 1080);
    const ctx = canvas.getContext('2d');
    
    // Background
    const gradient = ctx.createLinearGradient(0, 0, 1920, 1080);
    gradient.addColorStop(0, '#1a365d');
    gradient.addColorStop(1, '#2b6cb0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1920, 1080);
    
    // Título
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px Inter';
    ctx.textAlign = 'center';
    
    const words = section.title.split(' ');
    const lines = this.wrapText(words, 60);
    
    lines.forEach((line, i) => {
      ctx.fillText(line, 960, 400 + (i * 100));
    });
    
    // Subtítulo
    if (section.subtitle) {
      ctx.font = '36px Inter';
      ctx.fillStyle = '#d69e2e';
      ctx.fillText(section.subtitle, 960, 600);
    }
    
    // Número do slide
    ctx.font = '24px Inter';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'right';
    ctx.fillText(`${index + 1}`, 1850, 1000);
    
    return {
      image: canvas.toBuffer('image/png'),
      duration: section.duration || 5000,
      narration: section.narration,
    };
  }
  
  private async generateNarration(text: string, voice: string): Promise<string> {
    // Usar ElevenLabs ou Google Text-to-Speech
    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ELEVENLABS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        voice_id: voice,
        model_id: 'eleven_multilingual_v2',
        output_path: `temp/narration_${Date.now()}.mp3`,
      }),
    });
    
    const audioBuffer = await response.arrayBuffer();
    return Buffer.from(audioBuffer);
  }
  
  private async combineVideo(
    slides: Slide[],
    narration: Buffer,
    config: VideoConfig
  ): Promise<string> {
    const outputPath = `videos/${config.title.replace(/\s+/g, '_')}_${Date.now()}.mp4`;
    
    // Criar script FFmpeg
    let ffmpegScript = '';
    const inputs: string[] = [];
    
    slides.forEach((slide, i) => {
      const slidePath = `temp/slide_${i}.png`;
      fs.writeFileSync(slidePath, slide.image);
      ffmpegScript += `file '${slidePath}'\nduration ${slide.duration / 1000}\n`;
      inputs.push(slidePath);
    });
    
    // Concat slides
    fs.writeFileSync('temp/slides.txt', ffmpegScript);
    
    // Comando FFmpeg
    const command = `
      ffmpeg -f concat -safe 0 -i temp/slides.txt \
      -i ${narration} \
      -c:v libx264 -c:a aac \
      -pix_fmt yuv420p \
      -shortest ${outputPath}
    `;
    
    await execAsync(command);
    
    // Limpar temporários
    inputs.forEach(input => fs.unlinkSync(input));
    fs.unlinkSync('temp/slides.txt');
    
    return outputPath;
  }
}
```

#### 2.3 Sistema de Certificados

```typescript
// scripts/certificate-generator.ts
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export class CertificateGenerator {
  async generateCertificate(
    user: User,
    course: Course,
    completionDate: Date
  ): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]); // A4 landscape
    
    const { width, height } = page.getSize();
    
    // Cores
    const primaryColor = rgb(0.1, 0.21, 0.36); // #1a365d
    const accentColor = rgb(0.84, 0.62, 0.18); // #d69e2e
    const grayColor = rgb(0.4, 0.4, 0.4);
    
    // Fontes
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Borda decorativa
    page.drawRectangle({
      x: 40,
      y: 40,
      width: width - 80,
      height: height - 80,
      borderColor: primaryColor,
      borderWidth: 3,
    });
    
    // Header
    page.drawText('CERTIFICADO DE CONCLUSÃO', {
      x: width / 2,
      y: height - 100,
      size: 28,
      font: helveticaBold,
      color: primaryColor,
      align: 'center',
    });
    
    // Subheader
    page.drawText('Este certificado reconhece que', {
      x: width / 2,
      y: height - 150,
      size: 16,
      font: helveticaFont,
      color: grayColor,
      align: 'center',
    });
    
    // Nome do usuário
    page.drawText(`${user.firstName} ${user.lastName}`, {
      x: width / 2,
      y: height - 200,
      size: 32,
      font: helveticaBold,
      color: primaryColor,
      align: 'center',
    });
    
    // Completou
    page.drawText('completou com sucesso o curso', {
      x: width / 2,
      y: height - 250,
      size: 16,
      font: helveticaFont,
      color: grayColor,
      align: 'center',
    });
    
    // Nome do curso
    page.drawText(course.title, {
      x: width / 2,
      y: height - 300,
      size: 24,
      font: helveticaBold,
      color: accentColor,
      align: 'center',
    });
    
    // Data de conclusão
    page.drawText(`Data de Conclusão: ${completionDate.toLocaleDateString('pt-BR')}`, {
      x: width / 2,
      y: height - 350,
      size: 14,
      font: helveticaFont,
      color: grayColor,
      align: 'center',
    });
    
    // Carga horária
    page.drawText(`Carga Horária: ${course.duration} minutos`, {
      x: width / 2,
      y: height - 380,
      size: 14,
      font: helveticaFont,
      color: grayColor,
      align: 'center',
    });
    
    // Assinatura
    page.drawText('_________________________', {
      x: width / 2 - 100,
      y: 120,
      size: 16,
      font: helveticaFont,
      color: grayColor,
      align: 'center',
    });
    
    page.drawText('MilesAI Education Team', {
      x: width / 2,
      y: 100,
      size: 14,
      font: helveticaBold,
      color: primaryColor,
      align: 'center',
    });
    
    // Serial number
    const serialNumber = this.generateSerialNumber(user.id, course.id);
    page.drawText(`Serial: ${serialNumber}`, {
      x: width - 150,
      y: 50,
      size: 10,
      font: helveticaFont,
      color: grayColor,
    });
    
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }
  
  private generateSerialNumber(userId: string, courseId: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(`${userId}-${courseId}-${Date.now()}`);
    return hash.digest('hex').substring(0, 12).toUpperCase();
  }
}
```

### 3. SISTEMA DE VENDAS E DISTRIBUIÇÃO

#### 3.1 Upsell e Cross-sell

```typescript
// lib/sales/funnel.ts
export class SalesFunnel {
  async processEbookPurchase(
    userId: string,
    ebookId: string,
    paymentIntent: string
  ): Promise<SalesResult> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const ebook = await prisma.ebook.findUnique({ where: { id: ebookId } });
    
    // 1. Processar pagamento
    const payment = await this.processPayment(paymentIntent);
    
    if (payment.status === 'succeeded') {
      // 2. Criar transação
      const transaction = await prisma.transaction.create({
        data: {
          userId,
          ebookId,
          amount: ebook.price,
          status: 'completed',
          paymentIntent,
        },
      });
      
      // 3. Conceder acesso ao ebook
      await prisma.userEbookAccess.create({
        data: {
          userId,
          ebookId,
          transactionId: transaction.id,
          grantedAt: new Date(),
        },
      });
      
      // 4. Enviar email de confirmação
      await this.sendPurchaseConfirmation(user, ebook);
      
      // 5. Verificar upsell opportunities
      await this.checkUpsellOpportunities(user, ebook);
      
      return {
        success: true,
        transaction,
        nextStep: 'download',
      };
    }
    
    return { success: false, error: payment.error };
  }
  
  private async checkUpsellOpportunities(user: User, purchasedEbook: Ebook) {
    // Upsell 1: Curso premium
    const hasAdvancedCourse = await prisma.userCourseAccess.findFirst({
      where: {
        userId: user.id,
        course: { slug: 'advanced-masterclass' },
      },
    });
    
    if (!hasAdvancedCourse) {
      // Enviar oferta de upgrade em 24 horas
      await this.scheduleUpsellEmail(user.id, 'advanced-course', 24);
    }
    
    // Upsell 2: Consultoria 1:1
    if (purchasedEbook.price >= 40) {
      // Enviar oferta de consultoria em 48 horas
      await this.scheduleUpsellEmail(user.id, 'consultation', 48);
    }
    
    // Upsell 3: MilesAI Pro
    const isPro = await prisma.userSubscription.findFirst({
      where: {
        userId: user.id,
        status: 'active',
        plan: 'pro',
      },
    });
    
    if (!isPro) {
      // Enviar trial de Pro em 72 horas
      await this.scheduleUpsellEmail(user.id, 'pro-trial', 72);
    }
  }
  
  private async scheduleUpsellEmail(
    userId: string,
    offerType: string,
    delayHours: number
  ) {
    // Adicionar à fila de emails
    await emailQueue.add(
      'upsell-email',
      { userId, offerType },
      { delay: delayHours * 3600 * 1000 }
    );
  }
}
```

#### 3.2 Integração com Afiliados

```typescript
// lib/affiliate/tracking.ts
export class AffiliateTracking {
  async trackEbookPurchase(
    ebookId: string,
    affiliateId: string,
    userId: string,
    amount: number
  ): Promise<void> {
    // 1. Registrar conversão
    const conversion = await prisma.affiliateConversion.create({
      data: {
        affiliateId,
        ebookId,
        userId,
        amount,
        commission: amount * 0.3, // 30% commission
        status: 'pending',
      },
    });
    
    // 2. Atualizar stats do afiliado
    await prisma.affiliateStats.upsert({
      where: { affiliateId },
      update: {
        totalSales: { increment: amount },
        totalConversions: { increment: 1 },
        pendingCommission: { increment: amount * 0.3 },
      },
      create: {
        affiliateId,
        totalSales: amount,
        totalConversions: 1,
        pendingCommission: amount * 0.3,
      },
    });
    
    // 3. Track event for analytics
    await analytics.track({
      userId,
      event: 'Ebook Purchase',
      properties: {
        ebookId,
        affiliateId,
        amount,
        commission: amount * 0.3,
      },
    });
  }
  
  async generateAffiliateLinks(affiliateId: string): Promise<AffiliateLinks> {
    const ebooks = await prisma.ebook.findMany({ where: { isActive: true } });
    const links = {};
    
    for (const ebook of ebooks) {
      const trackingUrl = `${process.env.BASE_URL}/ebooks/${ebook.slug}?ref=${affiliateId}`;
      links[ebook.slug] = {
        direct: trackingUrl,
        cloaked: `${process.env.BASE_URL}/go/${ebook.slug}/${affiliateId}`,
        qr: await this.generateQRCode(trackingUrl),
      };
    }
    
    return links;
  }
  
  private async generateQRCode(url: string): Promise<string> {
    const qr = await QRCode.toDataURL(url, {
      width: 300,
      margin: 1,
      color: {
        dark: '#1a365d',
        light: '#ffffff',
      },
    });
    return qr;
  }
}
```

### 4. MÉTRICAS E ANALYTICS

```typescript
// lib/analytics/ebooks.ts
export class EbookAnalytics {
  async trackEbookMetrics(): Promise<EbookMetrics> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const metrics = await prisma.$queryRaw<EbookMetrics[]>`
      SELECT 
        e.id,
        e.title,
        e.price,
        COUNT(t.id) as total_sales,
        SUM(t.amount) as total_revenue,
        COUNT(DISTINCT t.user_id) as unique_buyers,
        AVG(r.rating) as avg_rating,
        COUNT(r.id) as total_reviews
      FROM ebooks e
      LEFT JOIN transactions t ON e.id = t.ebook_id
      LEFT JOIN reviews r ON e.id = r.ebook_id
      WHERE t.created_at >= ${thirtyDaysAgo} OR t.id IS NULL
      GROUP BY e.id, e.title, e.price
      ORDER BY total_revenue DESC
    `;
    
    return metrics.map(metric => ({
      ...metric,
      conversionRate: metric.unique_buyers / metric.total_views || 0,
      avgOrderValue: metric.total_revenue / metric.total_sales || 0,
    }));
  }
  
  async trackUserJourney(userId: string): Promise<UserJourney> {
    const events = await prisma.analyticsEvent.findMany({
      where: { userId },
      orderBy: { timestamp: 'asc' },
    });
    
    return events.map(event => ({
      timestamp: event.timestamp,
      event: event.event,
      properties: event.properties,
      context: event.context,
    }));
  }
}
```

### 5. AUTOMAÇÃO DE MARKETING

```typescript
// lib/marketing/automation.ts
export class MarketingAutomation {
  async setupEbookFunnel(ebookId: string): Promise<void> {
    const ebook = await prisma.ebook.findUnique({ where: { id: ebookId } });
    
    // Email 1: Lead magnet delivery (instant)
    await this.createAutomatedEmail({
      trigger: 'ebook_download',
      ebookId,
      delay: 0,
      subject: `Seu ebook "${ebook.title}" está aqui! 📚`,
      template: 'ebook-delivery',
    });
    
    // Email 2: Value email (Dia +1)
    await this.createAutomatedEmail({
      trigger: 'ebook_download',
      ebookId,
      delay: 24 * 3600 * 1000, // 1 day
      subject: '5 dicas que você NÃO encontra no ebook 🎯',
      template: 'value-content',
    });
    
    // Email 3: Case study (Dia +3)
    await this.createAutomatedEmail({
      trigger: 'ebook_download',
      ebookId,
      delay: 3 * 24 * 3600 * 1000, // 3 days
      subject: 'Como João viajou para Europa de graça (estudo de caso)',
      template: 'case-study',
    });
    
    // Email 4: Soft sell (Dia +5)
    await this.createAutomatedEmail({
      trigger: 'ebook_download',
      ebookId,
      delay: 5 * 24 * 3600 * 1000, // 5 days
      subject: 'Pronto para o próximo nível?',
      template: 'soft-sell',
    });
    
    // Email 5: Hard sell + urgency (Dia +7)
    await this.createAutomatedEmail({
      trigger: 'ebook_download',
      ebookId,
      delay: 7 * 24 * 3600 * 1000, // 7 days
      subject: '⏰ Última chance: 50% de desconto no curso avançado',
      template: 'hard-sell',
    });
  }
  
  async triggerAbandonedCartEmail(
    userId: string,
    ebookId: string,
    cartValue: number
  ): Promise<void> {
    // Email 1: 1 hour
    await emailQueue.add(
      'abandoned-cart-1',
      { userId, ebookId, cartValue },
      { delay: 3600 * 1000 }
    );
    
    // Email 2: 24 hours with discount
    await emailQueue.add(
      'abandoned-cart-2',
      { 
        userId, 
        ebookId, 
        cartValue, 
        discount: cartValue > 50 ? 0.2 : 0.1 
      },
      { delay: 24 * 3600 * 1000 }
    );
    
    // Email 3: 72 hours with bigger discount
    await emailQueue.add(
      'abandoned-cart-3',
      { 
        userId, 
        ebookId, 
        cartValue, 
        discount: 0.3,
        urgency: true
      },
      { delay: 72 * 3600 * 1000 }
    );
  }
}
```

### 6. INTEGRAÇÃO COM O APP PRINCIPAL

```typescript
// lib/integration/ebooks.ts
export class EbookIntegration {
  async grantEbookAccess(userId: string, ebookId: string): Promise<void> {
    // Criar registro de acesso
    await prisma.userEbookAccess.create({
      data: {
        userId,
        ebookId,
        grantedAt: new Date(),
      },
    });
    
    // Award points
    await this.awardPoints(userId, 'ebook_purchase', 100);
    
    // Check achievements
    const achievements = await checkAndAwardAchievements(userId);
    
    // Send notification
    await sendNotification(userId, {
      type: 'ebook_access',
      title: 'Novo ebook disponível!',
      message: 'Seu ebook está pronto para download.',
      data: { ebookId },
    });
  }
  
  async getUserEbooks(userId: string): Promise<UserEbook[]> {
    const accesses = await prisma.userEbookAccess.findMany({
      where: { userId },
      include: {
        ebook: true,
        transaction: true,
      },
      orderBy: { grantedAt: 'desc' },
    });
    
    return accesses.map(access => ({
      ebook: access.ebook,
      grantedAt: access.grantedAt,
      purchasePrice: access.transaction?.amount,
      downloadUrl: this.generateSignedUrl(access.ebook.downloadUrl),
    }));
  }
  
  private generateSignedUrl(downloadUrl: string): string {
    // Gerar URL temporária e assinada
    const s3 = new AWS.S3();
    const url = s3.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: downloadUrl,
      Expires: 60 * 60, // 1 hour
    });
    
    return url;
  }
}
```

### 7. MÉTRICAS E PERFORMANCE

```typescript
// lib/analytics/ebook-performance.ts
export class EbookPerformanceTracker {
  async trackEbookMetrics(): Promise<EbookPerformanceReport> {
    const report = {
      totalEbooks: await prisma.ebook.count(),
      totalSales: await prisma.transaction.count({
        where: { ebookId: { not: null }, status: 'completed' }
      }),
      totalRevenue: await prisma.transaction.aggregate({
        where: { ebookId: { not: null }, status: 'completed' },
        _sum: { amount: true }
      }),
      avgConversionRate: await this.calculateConversionRate(),
      topPerformingEbooks: await this.getTopEbooks(),
      customerLifetimeValue: await this.calculateCLV(),
      refundRate: await this.calculateRefundRate(),
    };
    
    return report;
  }
  
  private async calculateConversionRate(): Promise<number> {
    const totalDownloads = await prisma.userEbookAccess.count({
      where: { ebook: { isFree: false } }
    });
    
    const totalViews = await prisma.pageView.count({
      where: { page: { startsWith: '/ebooks/' } }
    });
    
    return totalDownloads / totalViews;
  }
  
  async trackFunnel(ebookId: string): Promise<FunnelMetrics> {
    return {
      views: await this.getViews(ebookId),
      downloads: await this.getDownloads(ebookId),
      purchases: await this.getPurchases(ebookId),
      upsells: await this.getUpsells(ebookId),
      conversionRates: {
        viewToDownload: 0,
        downloadToPurchase: 0,
        purchaseToUpsell: 0,
      },
    };
  }
}
```

---

## 📊 MÉTRICAS DE SUCESSO

### KPIs de Ebooks

| Métrica | Meta | Atual |
|---------|------|-------|
| Downloads/mês | 10,000 | - |
| Taxa de conversão | 5% | - |
| Receita/mês | $50,000 | - |
| AOV (Average Order Value) | $45 | - |
| Refund rate | <2% | - |

### KPIs de Cursos

| Métrica | Meta | Atual |
|---------|------|-------|
| Matrículas/mês | 500 | - |
| Taxa de conclusão | 70% | - |
| Receita/mês | $100,000 | - |
| NPS | >50 | - |

---

## 🚀 ROTEIRO DE IMPLEMENTAÇÃO

### Fase 1: MVP Ebooks (Mês 1-2)
- [ ] Setup do sistema de geração
- [ ] Criar primeiro ebook (Guia Definitivo)
- [ ] Landing page e checkout
- [ ] Email automation básico
- [ ] Deploy e testes

### Fase 2: Escalamento (Mês 3-4)
- [ ] +4 ebooks no portfólio
- [ ] Programa de afiliados
- [ ] Upsells e cross-sells
- [ ] Analytics avançado
- [ ] A/B testing

### Fase 3: Cursos (Mês 5-6)
- [ ] Curso gratuito (Miles 101)
- [ ] Curso premium (Masterclass)
- [ ] Plataforma de vídeos
- [ ] Certificados
- [ ] Gamificação

### Fase 4: Otimização (Mês 7+)
- [ ] IA avançada para conteúdo
- [ ] Personalização
- [ ] Expansão internacional
- [ ] White label
- [ ] B2B

---

## 💰 PROJEÇÃO FINANCEIRA

### Receita Anual Projetada

| Produto | Preço | Vendas/mês | Receita/mês | Receita/ano |
|---------|-------|------------|-------------|-------------|
| Ebook 1 | $29 | 500 | $14,500 | $174,000 |
| Ebook 2 | $49 | 300 | $14,700 | $176,400 |
| Ebook 3 | $39 | 200 | $7,800 | $93,600 |
| Ebook 4 | $34 | 150 | $5,100 | $61,200 |
| Ebook 5 | $44 | 100 | $4,400 | $52,800 |
| Curso 1 | $297 | 100 | $29,700 | $356,400 |
| **TOTAL** | - | - | **$76,200** | **$914,400** |

### Custos Estimados

| Item | Mensal | Anual |
|------|--------|-------|
| IA/APIs | $2,000 | $24,000 |
| Infraestrutura | $1,500 | $18,000 |
| Marketing | $5,000 | $60,000 |
| Afiliados (30%) | $22,860 | $274,320 |
| Equipe | $15,000 | $180,000 |
| **Total Custos** | **$46,360** | **$556,320** |

### Lucro Líquido Projetado: **$358,080/ano**

---

## 🎯 CONCLUSÃO

O sistema de produtos digitais do MilesAI representa uma oportunidade significativa de:

1. **Educação**: Democratizar conhecimento sobre travel hacking
2. **Automação**: Criar conteúdo em escala com IA
3. **Monetização**: Diversificar receitas além de afiliados
4. **Autoridade**: Estabelecer MilesAI como referência
5. **Comunidade**: Engajar usuários com conteúdo premium

Com a combinação de:
- ✅ Tecnologia de ponta (IA, automação)
- ✅ Conteúdo de qualidade e relevante
- ✅ Estratégia de marketing sofisticada
- ✅ Métricas e otimização contínua

Os produtos digitais podem se tornar uma fonte significativa de receita recorrente e alta margem, complementando perfeitamente o modelo de negócios principal do MilesAI.

**Próximo passo: Começar com o ebook gratuito como lead magnet e validar o modelo!**