# Miles Intelligence - Database Schema v4.0

> Schema definitivo para o banco de dados do MilesAI Platform.
> Este documento define a estrutura de dados que deve ser replicada no banco de dados de produção.

---

## 📊 Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                     MILES INTELLIGENCE                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   NEWS      │  │  PROGRAMS   │  │   CARDS     │         │
│  │  ARTICLES   │  │             │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│         │                │                │                 │
│         ▼                ▼                ▼                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              TRANSFER_PARTNERS                       │   │
│  │         (many-to-many relationships)                 │   │
│  └─────────────────────────────────────────────────────┘   │
│         │                                                   │
│         ▼                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   DEALS     │  │  CONTENT    │  │   MARKET    │         │
│  │             │  │  (Guides)   │  │    DATA     │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Entidades Principais

### 1. `news_articles`
Armazena todas as notícias do portal (Miles & Points, Cards).

```sql
CREATE TABLE news_articles (
  id              VARCHAR(36) PRIMARY KEY,    -- UUID
  type            ENUM('breaking', 'program_update', 'award_alert', 'deal_alert', 'market_analysis'),
  priority        ENUM('critical', 'urgent', 'high', 'medium', 'low'),
  category        VARCHAR(50) NOT NULL,       -- 'transfer_bonus', 'program_change', 'award_availability', etc.
  tab             ENUM('miles_and_points', 'cards', 'content'),
  
  headline        VARCHAR(255) NOT NULL,
  dateline        VARCHAR(100),               -- "JAN 16, 2026 • 14:32 EST"
  summary         TEXT NOT NULL,
  
  image_url       VARCHAR(500),
  expires_at      TIMESTAMP NULL,             -- NULL = no expiration
  
  impact_level    ENUM('critical', 'high', 'medium', 'low'),
  action_required BOOLEAN DEFAULT FALSE,
  
  details         JSON,                       -- Flexible details object
  
  cta_text        VARCHAR(100),
  cta_url         VARCHAR(500),
  cta_urgency     ENUM('critical', 'high', 'medium', 'low'),
  
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  published_at    TIMESTAMP,
  
  INDEX idx_tab (tab),
  INDEX idx_priority (priority),
  INDEX idx_expires (expires_at),
  INDEX idx_category (category)
);
```

**JSON `details` structure examples:**

```json
// For transfer_bonus
{
  "bonus_percentage": 40,
  "from_program": "Capital One Miles",
  "to_program": "Avianca LifeMiles",
  "sweet_spots": ["USA-Europe Business: 63K", "..."]
}

// For card_launch
{
  "card_name": "Venture X Business",
  "issuer": "Capital One",
  "welcome_bonus": "150,000 Miles",
  "annual_fee": "$395",
  "key_benefits": ["..."]
}
```

---

### 2. `programs`
Programas de fidelidade (airlines, hotels, flexible currencies).

```sql
CREATE TABLE programs (
  id              VARCHAR(36) PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  short_name      VARCHAR(30) NOT NULL,
  logo_url        VARCHAR(500),
  
  currency_type   ENUM('flexible', 'airline', 'hotel'),
  
  current_value   DECIMAL(4,2),               -- CPP (cents per point)
  previous_value  DECIMAL(4,2),
  change_percent  DECIMAL(5,2),
  trend           ENUM('up', 'down', 'stable'),
  
  all_time_high   DECIMAL(4,2),
  all_time_low    DECIMAL(4,2),
  
  health_status   ENUM('hot', 'healthy', 'stable', 'caution', 'declining'),
  health_rating   DECIMAL(2,1),               -- 0.0 to 5.0
  
  analysis        TEXT,
  best_uses       JSON,                        -- Array of strings
  
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_currency_type (currency_type),
  INDEX idx_health_status (health_status)
);
```

---

### 3. `program_historical_data`
Dados históricos de valuações.

```sql
CREATE TABLE program_historical_data (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  program_id  VARCHAR(36) NOT NULL,
  date        DATE NOT NULL,
  value       DECIMAL(4,2) NOT NULL,
  
  FOREIGN KEY (program_id) REFERENCES programs(id),
  UNIQUE KEY uniq_program_date (program_id, date),
  INDEX idx_date (date)
);
```

---

### 4. `cards`
Cartões de crédito.

```sql
CREATE TABLE cards (
  id              VARCHAR(36) PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  issuer          VARCHAR(50) NOT NULL,       -- 'Chase', 'Amex', 'Capital One', etc.
  image_url       VARCHAR(500),
  
  annual_fee      VARCHAR(20),                -- "$395", "$0", etc.
  welcome_bonus   VARCHAR(100),
  spend_requirement VARCHAR(100),
  
  earning_rates   JSON,                        -- {"dining": "4x", "travel": "3x", ...}
  key_benefits    JSON,                        -- Array of strings
  
  our_rating      DECIMAL(2,1),
  best_for        JSON,                        -- Array of target audiences
  
  is_business     BOOLEAN DEFAULT FALSE,
  
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_issuer (issuer)
);
```

---

### 5. `transfer_partners`
Relação many-to-many entre programas.

```sql
CREATE TABLE transfer_partners (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  from_program_id VARCHAR(36) NOT NULL,
  to_program_id   VARCHAR(36) NOT NULL,
  
  transfer_ratio  VARCHAR(20),                -- "1:1", "1:1.25", etc.
  min_transfer    INT,
  
  FOREIGN KEY (from_program_id) REFERENCES programs(id),
  FOREIGN KEY (to_program_id) REFERENCES programs(id),
  UNIQUE KEY uniq_partner (from_program_id, to_program_id)
);
```

---

### 6. `transfer_bonuses`
Bônus de transferência ativos.

```sql
CREATE TABLE transfer_bonuses (
  id              VARCHAR(36) PRIMARY KEY,
  from_program_id VARCHAR(36) NOT NULL,
  to_program_id   VARCHAR(36) NOT NULL,
  
  bonus_percent   INT NOT NULL,
  expires_at      TIMESTAMP NOT NULL,
  
  impact          ENUM('critical', 'high', 'medium', 'low'),
  recommendation  TEXT,
  
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (from_program_id) REFERENCES programs(id),
  FOREIGN KEY (to_program_id) REFERENCES programs(id),
  INDEX idx_expires (expires_at)
);
```

---

### 7. `deals`
Ofertas e deals diversos.

```sql
CREATE TABLE deals (
  id              VARCHAR(36) PRIMARY KEY,
  category        ENUM('transfer_bonus', 'card_bonus', 'award_availability', 'hotel_promo', 'mistake_fare'),
  urgency         ENUM('critical', 'urgent', 'medium'),
  
  title           VARCHAR(255) NOT NULL,
  subtitle        VARCHAR(255),
  summary         TEXT,
  
  value_estimate  VARCHAR(100),
  expires_at      TIMESTAMP,
  
  image_url       VARCHAR(500),
  requirements    TEXT,
  best_for        JSON,
  
  cta_text        VARCHAR(50),
  cta_url         VARCHAR(500),
  
  details         JSON,                        -- Category-specific details
  
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_category (category),
  INDEX idx_urgency (urgency),
  INDEX idx_expires (expires_at)
);
```

---

### 8. `content_articles`
Conteúdo evergreen (guias, tutoriais, análises).

```sql
CREATE TABLE content_articles (
  id              VARCHAR(36) PRIMARY KEY,
  type            ENUM('guide', 'tutorial', 'deep_dive', 'analysis', 'comparison'),
  
  headline        VARCHAR(255) NOT NULL,
  summary         TEXT NOT NULL,
  body            LONGTEXT,                    -- Full article content (Markdown)
  
  author          VARCHAR(100),
  image_url       VARCHAR(500),
  reading_time    VARCHAR(20),                 -- "12 min read"
  
  category        VARCHAR(50),
  difficulty      ENUM('beginner', 'intermediate', 'advanced'),
  
  tags            JSON,                         -- Array of strings
  featured        BOOLEAN DEFAULT FALSE,
  
  published_at    TIMESTAMP,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_type (type),
  INDEX idx_difficulty (difficulty),
  INDEX idx_featured (featured)
);
```

---

### 9. `hacks`
Estratégias e hacks.

```sql
CREATE TABLE hacks (
  id                  VARCHAR(36) PRIMARY KEY,
  category            ENUM('earning', 'redeeming', 'advanced', 'beginner', 'status'),
  
  title               VARCHAR(255) NOT NULL,
  summary             TEXT NOT NULL,
  
  difficulty          ENUM('easy', 'medium', 'hard'),
  value_potential     ENUM('low', 'medium', 'high', 'insane'),
  time_investment     ENUM('low', 'medium', 'high'),
  
  detailed_steps      JSON,                    -- Array of step strings
  requirements        JSON,
  warnings            JSON,
  
  estimated_annual_value VARCHAR(100),
  difficulty_rating   INT,                     -- 1-10
  legality            ENUM('fully_legal', 'gray_area', 'terms_violation'),
  
  tags                JSON,
  success_rate        VARCHAR(10),             -- "95%"
  community_rating    DECIMAL(2,1),
  
  last_verified       DATE,
  created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_category (category),
  INDEX idx_difficulty (difficulty),
  INDEX idx_value (value_potential)
);
```

---

### 10. `market_alerts`
Alertas e insights de mercado.

```sql
CREATE TABLE market_alerts (
  id          VARCHAR(36) PRIMARY KEY,
  type        ENUM('opportunity', 'warning', 'insight'),
  urgency     ENUM('critical', 'medium', 'low'),
  
  title       VARCHAR(255) NOT NULL,
  message     TEXT NOT NULL,
  
  active      BOOLEAN DEFAULT TRUE,
  
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at  TIMESTAMP,
  
  INDEX idx_type (type),
  INDEX idx_active (active)
);
```

---

## 🔄 Relacionamentos

```
programs ─────────────┬───────────────── cards
    │                 │ (via transfer_partners)
    │                 │
    ▼                 ▼
transfer_bonuses    deals
    │                 │
    └────────┬────────┘
             │
             ▼
        news_articles
```

---

## 📈 Indexes Recomendados

1. **Busca por urgência/prioridade**: `news_articles.priority`, `deals.urgency`
2. **Conteúdo expirando**: `news_articles.expires_at`, `deals.expires_at`, `transfer_bonuses.expires_at`
3. **Categorização**: `news_articles.tab`, `news_articles.category`, `content_articles.type`
4. **Performance de programas**: `programs.health_status`, `programs.currency_type`

---

## 📁 Estrutura JSON Demo

Os arquivos JSON demo seguem exatamente esta estrutura:

- `/demos/data/news-portal.json` → `news_articles`
- `/demos/data/miles-tracker.json` → `programs`, `transfer_bonuses`, `market_alerts`
- `/demos/data/hot-deals.json` → `deals`
- `/demos/data/hacks-library.json` → `hacks`
- `/demos/data/card-universe.json` → `cards`, `news_articles` (type: card_*)
- `/demos/data/market-pulse.json` → `market_alerts`, analytics data

---

## ⚡ API Endpoints Sugeridos

```
GET  /api/news?tab={miles_and_points|cards|content}&limit=10
GET  /api/programs
GET  /api/programs/{id}/history?range={1m|6m|1y}
GET  /api/bonuses/active
GET  /api/deals?category={}&urgency={}
GET  /api/content?type={}&difficulty={}
GET  /api/hacks?category={}&difficulty={}
GET  /api/alerts/active
```

---

*Schema Version: 4.0.0*
*Last Updated: January 2026*
*Compatible with: MySQL 8.0+, PostgreSQL 14+*
