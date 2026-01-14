# 🎯 MEGA PROMPT: Travel World - MilesAI/MilesOS

> **DOCUMENTO MESTRE PARA DESENVOLVIMENTO**
> Use este prompt como base para qualquer IA que trabalhe neste projeto.
> Última atualização: Janeiro 2026

---

## 1. CONTEXTO DO PROJETO

### 1.1 O Que É
**MilesAI (ou MilesOS)** é um superapp de milhas e viagens focado no mercado americano que combina:
- Ferramentas de otimização de pontos e milhas
- Educação premium (ebooks e cursos)
- Buscador de voos com pontos
- Comunidade de travel hackers
- Gamificação para transformar iniciantes em experts

### 1.2 Proposta de Valor Única
> "Transformar gastos do dia a dia em viagens premium com o menor custo e menor tempo — mostrando em tempo real o que fazer AGORA para chegar na sua próxima viagem."

### 1.3 Diferencial Crítico
Este NÃO é "mais um blog de milhas". É um **sistema operacional** que:
1. **DECIDE** → Cash vs points? Qual cartão? Qual transferência?
2. **EXECUTA** → Checklists, alertas, rotas de ação
3. **ENSINA** → Micro-aulas, cursos estruturados
4. **PROVA** → Histórico, score de progresso, resultados reais

### 1.4 Mercado Alvo
- **Primário**: Americanos classe média-alta interessados em travel hacking
- **Secundário**: Brasileiros expatriados nos EUA
- **Perfil**: 28-55 anos, renda $75K+, viaja 2+ vezes/ano

### 1.5 Modelo de Negócio
- **Freemium SaaS**: $0 (básico) → $19/mês (Pro) → $49/mês (Elite)
- **Produtos Digitais**: Ebooks ($29-$49), Cursos ($49-$297)
- **Afiliados**: Comissões de cartões (SECUNDÁRIO, não primário!)

---

## 2. FILOSOFIA E TOM DE COMUNICAÇÃO

### 2.1 Posicionamento Central
> **"Via alternativa ao sistema. Ganhos reais. Independência total."**

Somos diferentes porque:
- ❌ NÃO somos afiliados de bancos tentando empurrar cartões
- ❌ NÃO temos conflito de interesse nas recomendações
- ✅ Colocamos o USUÁRIO em primeiro lugar
- ✅ Mostramos cálculos transparentes
- ✅ Admitimos quando algo não vale a pena

### 2.2 Tom de Voz

| Característica | Descrição | Exemplo |
|----------------|-----------|---------|
| **Direto** | Sem rodeios, vai ao ponto | "Esse cartão não vale para você se gasta menos de $3K/mês em restaurantes." |
| **Elegante** | Sofisticado, nunca agressivo | "Veja como maximizar seu retorno" (não "GANHE MILHÕES DE PONTOS!!!!") |
| **Honesto** | Admite limitações e incertezas | "Este cálculo é baseado em valores médios. Seu caso pode variar." |
| **Empoderador** | Faz o usuário se sentir inteligente | "Você acaba de descobrir um sweet spot que 95% das pessoas desconhece." |

### 2.3 Palavras e Frases PROIBIDAS

```
❌ "Incrível", "Fantástico", "Revolucionário", "Exclusivo", "Limitado"
❌ "Fique rico", "Dinheiro fácil", "Sem esforço"
❌ "Milhões de pontos", "Viaje de graça para sempre"
❌ "Clique aqui agora", "Última chance", "Oferta imperdível"
❌ "Experts recomendam" (sem citar quem)
❌ Promessas que não podem ser comprovadas
❌ CAPS LOCK excessivo ou múltiplos pontos de exclamação!!!
```

### 2.4 Palavras e Frases PREFERIDAS

```
✅ "Estratégia comprovada", "Dados reais", "Cálculo transparente"
✅ "Vale a pena SE...", "Considere que...", "Na prática..."
✅ "Vantagem real de X%", "Economia estimada de $Y"
✅ "Testamos e funcionou", "Nossa análise indica"
✅ "Sweet spot", "Travel hacking", "Maximizar valor"
✅ "Passo a passo", "Checklist", "Plano de ação"
```

### 2.5 Nível de Formalidade
- **Web/App**: Semi-casual, profissional mas acessível
- **Ebooks**: Mais formal, educacional
- **Cursos**: Conversacional de professor para aluno
- **Comunidade**: Casual entre amigos experts

---

## 3. CATÁLOGO DE PRODUTOS

### 3.1 Ebooks (5 títulos)

| # | Título | Nível | Páginas | Preço |
|---|--------|-------|---------|-------|
| 1 | Miles & Points Foundations | Iniciante | ~80 | $29 (grátis lead magnet) |
| 2 | The Card Strategy Playbook | Intermediário | ~120 | $49 |
| 3 | Award Travel Mastery | Avançado | ~150 | $49 |
| 4 | Bank Bonus Blueprint | Avançado | ~100 | $44 |
| 5 | Family & Group Travel with Points | Todos | ~80 | $34 |

### 3.2 Cursos (3 títulos)

| # | Título | Nível | Duração | Preço |
|---|--------|-------|---------|-------|
| 1 | Points & Miles Fundamentals | Iniciante | 3h | GRÁTIS |
| 2 | Advanced Earning Strategies | Intermediário | 5h | $49 |
| 3 | Expert Redemption Masterclass | Avançado | 8h | $99 |

### 3.3 Módulos do App (10 recursos)

| # | Módulo | Função Principal |
|---|--------|------------------|
| M1 | Cash vs Points Calculator | Decidir se vale usar pontos ou pagar cash |
| M2 | Award Finder & Alerts | Buscar e monitorar voos com pontos |
| M3 | Points Value Intelligence | Ver quanto vale cada ponto por programa |
| M4 | Transfer Map & Path Optimizer | Encontrar melhor caminho de transferência |
| M5 | Card Strategy Simulator | Simular portfólio de cartões ideal |
| M6 | Best Card To Pay With | Saber qual cartão usar em cada compra |
| M7 | Deal Radar | Feed de promoções e bônus |
| M8 | Wallet Sync | Consolidar saldos e expirações |
| M9 | Learning Hub + AI Coach | Cursos e assistente inteligente |
| M10 | 90-Day Points Metamorphosis | Gamificação de 90 dias |

---

## 4. DESIGN SYSTEM

### 4.1 Paleta de Cores

```css
/* === LIGHT THEME (Único) — Clean & Premium === */

/* Fundos */
--color-bg-primary: #ffffff;        /* Background principal - branco puro */
--color-bg-secondary: #f8fafc;      /* Cards, modais - off-white sofisticado */
--color-bg-tertiary: #f1f5f9;       /* Hover states, inputs, áreas destacadas */
--color-bg-elevated: #ffffff;       /* Elementos elevados (dropdowns, popovers) */
--color-bg-canvas: #fafbfc;         /* Background da página/app */

/* Cores Primárias - Indigo Refinado */
--color-primary: #4f46e5;           /* Indigo vibrante - ações principais */
--color-primary-hover: #4338ca;     /* Hover - mais profundo */
--color-primary-light: #eef2ff;     /* Background sutil para highlights */
--color-primary-muted: rgba(79, 70, 229, 0.08);  /* Backgrounds muito sutis */

/* Cores de Destaque */
--color-accent: #f59e0b;            /* Amber premium - destaques, badges */
--color-accent-light: #fef3c7;      /* Background para badges amber */
--color-success: #059669;           /* Verde esmeralda - ganhos, economias */
--color-success-light: #d1fae5;     /* Background para success states */
--color-warning: #d97706;           /* Amber escuro - alertas */
--color-warning-light: #fef3c7;     /* Background para warnings */
--color-danger: #dc2626;            /* Vermelho - perdas, erros */
--color-danger-light: #fee2e2;      /* Background para errors */
--color-info: #0284c7;              /* Azul sky - informações */
--color-info-light: #e0f2fe;        /* Background para info states */

/* Textos - Hierarquia Clara */
--color-text-primary: #0f172a;      /* Títulos, texto principal - slate 900 */
--color-text-secondary: #475569;    /* Descrições, labels - slate 600 */
--color-text-muted: #94a3b8;        /* Placeholders, texto desabilitado */
--color-text-inverse: #ffffff;      /* Texto sobre fundos escuros */

/* Bordas e Divisores */
--color-border: #e2e8f0;            /* Bordas padrão - sutil */
--color-border-hover: #cbd5e1;      /* Bordas em hover */
--color-border-focus: #4f46e5;      /* Bordas em focus - primary */
--color-divider: #f1f5f9;           /* Linhas divisórias sutis */

/* Gradientes Premium */
--gradient-primary: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
--gradient-primary-soft: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
--gradient-gold: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
--gradient-success: linear-gradient(135deg, #059669 0%, #047857 100%);
--gradient-hero: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
--gradient-card-shine: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.6) 100%);

/* Overlays */
--overlay-light: rgba(255, 255, 255, 0.8);
--overlay-dark: rgba(15, 23, 42, 0.4);
```

### 4.2 Tipografia

```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

--font-display: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Tamanhos */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */

/* Pesos */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 4.3 Espaçamentos

```css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
```

### 4.4 Efeitos Visuais

```css
/* Bordas - Arredondamentos Modernos */
--radius-xs: 0.25rem;    /* 4px - badges pequenos */
--radius-sm: 0.375rem;   /* 6px - chips, tags */
--radius-md: 0.5rem;     /* 8px - inputs, botões pequenos */
--radius-lg: 0.75rem;    /* 12px - cards pequenos */
--radius-xl: 1rem;       /* 16px - cards padrão */
--radius-2xl: 1.25rem;   /* 20px - cards destacados */
--radius-3xl: 1.5rem;    /* 24px - modais, hero sections */
--radius-full: 9999px;   /* Círculos, pills */

/* Sombras - Light Mode Elegante */
--shadow-xs: 0 1px 2px rgba(15, 23, 42, 0.04);
--shadow-sm: 0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04);
--shadow-md: 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -1px rgba(15, 23, 42, 0.04);
--shadow-lg: 0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04);
--shadow-xl: 0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 10px 10px -5px rgba(15, 23, 42, 0.03);
--shadow-2xl: 0 25px 50px -12px rgba(15, 23, 42, 0.15);

/* Sombras Coloridas - Para elementos interativos */
--shadow-primary: 0 4px 14px rgba(79, 70, 229, 0.25);
--shadow-primary-lg: 0 8px 24px rgba(79, 70, 229, 0.3);
--shadow-success: 0 4px 14px rgba(5, 150, 105, 0.25);
--shadow-accent: 0 4px 14px rgba(245, 158, 11, 0.25);

/* Sombra de Elevação para Cards */
--shadow-card: 0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.06);
--shadow-card-hover: 0 10px 40px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.04);

/* Glassmorphism Light - Efeito Fosco Premium */
--glass-bg: rgba(255, 255, 255, 0.7);
--glass-bg-strong: rgba(255, 255, 255, 0.85);
--glass-border: rgba(255, 255, 255, 0.5);
--glass-border-subtle: rgba(226, 232, 240, 0.8);
--glass-blur: blur(12px);
--glass-blur-strong: blur(20px);

/* Transições - Suaves e Profissionais */
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-normal: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-bounce: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);

/* Animações de Entrada */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1);
```

### 4.5 Componentes Base

**Cards - Padrão:**
```css
.card {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-card);
  transition: all var(--transition-normal);
}
.card:hover {
  box-shadow: var(--shadow-card-hover);
  border-color: var(--color-border-hover);
  transform: translateY(-2px);
}
```

**Cards - Destacado/Featured:**
```css
.card--featured {
  background: var(--color-bg-primary);
  border: 2px solid var(--color-primary);
  box-shadow: var(--shadow-primary);
}
```

**Cards - Com Gradiente Sutil:**
```css
.card--gradient {
  background: var(--gradient-primary-soft);
  border: 1px solid var(--color-primary-light);
}
```

**Buttons - Primário:**
```css
.btn-primary {
  background: var(--gradient-primary);
  color: var(--color-text-inverse);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  box-shadow: var(--shadow-primary);
  transition: all var(--transition-fast);
  border: none;
}
.btn-primary:hover {
  box-shadow: var(--shadow-primary-lg);
  transform: translateY(-1px);
}
.btn-primary:active {
  transform: translateY(0);
}
```

**Buttons - Secundário/Outline:**
```css
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  padding: var(--space-3) var(--space-6);
  border: 1.5px solid var(--color-primary);
  border-radius: var(--radius-lg);
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
}
.btn-secondary:hover {
  background: var(--color-primary-light);
}
```

**Buttons - Ghost/Terciário:**
```css
.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
}
.btn-ghost:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}
```

**Inputs:**
```css
.input {
  background: var(--color-bg-primary);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  color: var(--color-text-primary);
  transition: all var(--transition-fast);
}
.input::placeholder {
  color: var(--color-text-muted);
}
.input:hover {
  border-color: var(--color-border-hover);
}
.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-muted);
}
```

**Badges/Tags:**
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: 0.025em;
}
.badge--primary {
  background: var(--color-primary-light);
  color: var(--color-primary);
}
.badge--success {
  background: var(--color-success-light);
  color: var(--color-success);
}
.badge--accent {
  background: var(--color-accent-light);
  color: var(--color-warning);
}
```

**Metric Cards (para valores/estatísticas):**
```css
.metric-card {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
}
.metric-card__value {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  font-variant-numeric: tabular-nums;
}
.metric-card__label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-top: var(--space-1);
}
.metric-card--positive .metric-card__value {
  color: var(--color-success);
}
.metric-card--negative .metric-card__value {
  color: var(--color-danger);
}
```

**Navigation/Tabs:**
```css
.tabs {
  display: flex;
  gap: var(--space-1);
  background: var(--color-bg-tertiary);
  padding: var(--space-1);
  border-radius: var(--radius-lg);
}
.tab {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}
.tab:hover {
  color: var(--color-text-primary);
}
.tab--active {
  background: var(--color-bg-primary);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}
```

### 4.6 Princípios de UI/UX — Light Mode Premium

**Hierarquia Visual:**
1. **Elevação por sombra** (não por cor de fundo escura)
   - Cards elevados: `--shadow-card` → `--shadow-card-hover`
   - Modais/Popovers: `--shadow-xl` + `--overlay-dark` backdrop

2. **Contraste por tipografia** (não por cores gritantes)
   - Títulos: `--color-text-primary` (#0f172a) - forte
   - Corpo: `--color-text-secondary` (#475569) - legível
   - Auxiliar: `--color-text-muted` (#94a3b8) - sutil

3. **Cor como destaque** (uso estratégico, não decorativo)
   - Primary indigo: CTAs, links, estados ativos
   - Success verde: valores positivos, confirmações
   - Accent amber: badges especiais, destaques premium
   - Danger vermelho: apenas para erros/alertas críticos

**Espaçamento Consistente (8px grid):**
```
Micro: 4px, 8px (--space-1, --space-2)
Elementos: 12px, 16px, 20px (--space-3 a --space-5)
Seções: 24px, 32px, 48px (--space-6, --space-8, --space-12)
Páginas: 64px, 80px (--space-16, --space-20)
```

**Feedback Visual:**
```css
/* Hover states - sempre sutis */
:hover {
  transform: translateY(-1px) ou (-2px);
  box-shadow: aumenta um nível;
}

/* Focus states - acessível e visível */
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-muted);
}

/* Active states - feedback imediato */
:active {
  transform: translateY(0);
  filter: brightness(0.95);
}

/* Disabled states - claramente inativo */
:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Loading States:**
```css
/* Skeleton loading - sutil pulse */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-bg-tertiary) 0%,
    var(--color-bg-secondary) 50%,
    var(--color-bg-tertiary) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

/* Spinner - indigo primary */
.spinner {
  border: 2px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

### 4.7 Iconografia

**Biblioteca Recomendada:** Lucide Icons (https://lucide.dev)
- Estilo: Line icons, stroke 1.5-2px
- Tamanhos padrão: 16px, 20px, 24px
- Cor: herda do texto ou usa `currentColor`

**Ícones Essenciais do App:**
```
Navigation: Home, Compass, BookOpen, User, Settings
Cards: CreditCard, Wallet, PiggyBank, TrendingUp
Travel: Plane, Hotel, MapPin, Globe, Calendar
Actions: Plus, Search, Filter, Download, Share
Status: Check, X, AlertTriangle, Info, Star
Arrows: ChevronRight, ChevronDown, ArrowRight, ExternalLink
```

### 4.8 Layouts Padrão

**Container Widths:**
```css
--container-sm: 640px;   /* Conteúdo focado (forms, artigos) */
--container-md: 768px;   /* Conteúdo médio */
--container-lg: 1024px;  /* Dashboard, listagens */
--container-xl: 1280px;  /* Full-width com sidebar */
```

**Grid System:**
```css
/* Cards grid responsivo */
.grid-cards {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

/* Dashboard layout */
.layout-dashboard {
  display: grid;
  gap: var(--space-8);
  grid-template-columns: 280px 1fr;
}

/* Sidebar móvel */
@media (max-width: 1024px) {
  .layout-dashboard {
    grid-template-columns: 1fr;
  }
}
```

---

## 5. ESTRUTURA DE DADOS

### 5.1 Schema: Credit Card

```json
{
  "id": "chase-sapphire-preferred",
  "name": "Chase Sapphire Preferred",
  "issuer": "chase",
  "network": "visa",
  "program": "chase-ultimate-rewards",
  "annual_fee": 95,
  "welcome_bonus": {
    "points": 75000,
    "spend_requirement": 4000,
    "time_limit_months": 3,
    "value_estimate": 1500
  },
  "earning_rates": [
    { "category": "travel", "rate": 5, "note": "via portal" },
    { "category": "dining", "rate": 3 },
    { "category": "streaming", "rate": 3 },
    { "category": "other", "rate": 1 }
  ],
  "benefits": [
    "Primary rental car insurance",
    "Trip cancellation insurance",
    "$50 annual hotel credit"
  ],
  "credit_score_required": "good",
  "best_for": ["Travel enthusiasts", "Dining out frequently"],
  "restrictions": ["5/24 rule applies"],
  "affiliate_link": "",
  "updated_at": "2026-01-14T00:00:00Z"
}
```

### 5.2 Schema: Loyalty Program

```json
{
  "id": "chase-ultimate-rewards",
  "name": "Chase Ultimate Rewards",
  "type": "bank",
  "cpp_values": {
    "cashback": 1.0,
    "travel_portal": 1.25,
    "transfer_average": 1.8,
    "transfer_best": 2.5
  },
  "transfer_partners": [
    {
      "program": "United MileagePlus",
      "ratio": "1:1",
      "transfer_time": "instant",
      "sweet_spots": ["Polaris to Europe 70K"]
    },
    {
      "program": "Hyatt World of Hyatt",
      "ratio": "1:1",
      "transfer_time": "instant",
      "sweet_spots": ["Category 1-4 hotels 5K-15K"]
    }
  ],
  "expiration_policy": "No expiration while account active",
  "updated_at": "2026-01-14T00:00:00Z"
}
```

### 5.3 Schema: Deal

```json
{
  "id": "deal-2026-01-001",
  "type": "card_bonus",
  "title": "Amex Gold 90K Limited Time",
  "description": "Increased welcome bonus of 90K MR points",
  "value_estimate": 1800,
  "original_value": 1200,
  "savings_percent": 50,
  "requirements": "Spend $6K in 6 months",
  "expires_at": "2026-02-28T23:59:59Z",
  "source_url": "https://...",
  "tags": ["amex", "gold", "welcome-bonus"],
  "is_targeted": false,
  "priority": "high",
  "created_at": "2026-01-10T00:00:00Z"
}
```

### 5.4 Schema: Award Flight

```json
{
  "id": "flight-jfk-cdg-ua-001",
  "origin": {
    "code": "JFK",
    "city": "New York",
    "country": "US"
  },
  "destination": {
    "code": "CDG",
    "city": "Paris",
    "country": "FR"
  },
  "airline": "United Airlines",
  "flight_number": "UA57",
  "cabin_class": "business",
  "program": "United MileagePlus",
  "points_required": 70000,
  "taxes_usd": 150,
  "cash_price_usd": 4500,
  "cpp_value": 6.21,
  "cpp_rating": "excellent",
  "availability": {
    "dates_available": ["2026-03-15", "2026-03-17", "2026-03-22"],
    "seats_typical": 2
  },
  "route_type": "direct",
  "duration_hours": 7.5,
  "updated_at": "2026-01-14T00:00:00Z"
}
```

---

## 6. DIRETRIZES TÉCNICAS

### 6.1 Stack para Demos (HTML/CSS/JS)

```
- HTML5 semântico
- CSS3 vanilla (custom properties, flexbox, grid)
- JavaScript ES6+ vanilla (nenhum framework)
- Sem dependências externas além de Google Fonts
- Mobile-first responsive design
- Light mode exclusivo (clean, premium aesthetic)
- Foco em clareza visual e hierarquia de informação
```

### 6.2 Padrões de Código

**HTML:**
```html
<!-- Use classes descritivas em inglês -->
<div class="card card--featured">
  <header class="card__header">
    <h2 class="card__title">...</h2>
  </header>
  <div class="card__body">...</div>
  <footer class="card__footer">...</footer>
</div>
```

**CSS (BEM + Custom Properties):**
```css
.card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
}

.card--featured {
  border-color: var(--color-primary);
}

.card__title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
}
```

**JavaScript:**
```javascript
// Use const/let, arrow functions, template literals
// Organize em módulos lógicos
// Comentários explicativos para lógica de negócio

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};
```

### 6.3 Acessibilidade (WCAG 2.1 AA)
- Contraste mínimo 4.5:1 para texto
- Todos os interativos com `focus-visible`
- Labels em todos os inputs
- Alt text em imagens
- Navegação por teclado funcional

### 6.4 Responsividade

```css
/* Breakpoints */
--bp-sm: 640px;   /* Mobile landscape */
--bp-md: 768px;   /* Tablet */
--bp-lg: 1024px;  /* Desktop */
--bp-xl: 1280px;  /* Large desktop */
```

---

## 7. GUARDRAILS E RESTRIÇÕES

### 7.1 O Que a IA NÃO Pode Fazer

```
❌ Inventar dados de cartões/programas sem indicar que são fictícios
❌ Fazer promessas de ganhos específicos sem disclaimer
❌ Recomendar cartões específicos como "o melhor" universalmente
❌ Copiar texto de outras fontes sem transformar
❌ Usar imagens com copyright sem permissão
❌ Criar conteúdo que pareça conselho financeiro regulamentado
❌ Ignorar a filosofia anti-afiliado do projeto
```

### 7.2 Como Lidar com Incertezas

```
Se dados são estimados:
→ Indicar "Valor estimado baseado em médias do mercado"

Se informação pode estar desatualizada:
→ Mostrar "Última atualização: [data]"

Se recomendação depende do perfil:
→ Usar "Ideal se você..." em vez de "Você deve..."

Se cálculo é aproximado:
→ Explicar metodologia brevemente
```

### 7.3 Formato de Saída

**Para conteúdo educacional:**
- Markdown bem formatado
- Headers hierárquicos (H1 → H2 → H3)
- Listas para pontos-chave
- Tabelas para comparações
- Callouts para dicas importantes

**Para código:**
- Comentários explicativos
- Indentação consistente (2 espaços)
- Nomes de variáveis em inglês
- CSS custom properties para valores reutilizáveis

**Para dados:**
- JSON bem formatado
- Campos com snake_case
- Datas em ISO 8601
- Valores monetários em centavos ou com 2 decimais

---

## 8. EXEMPLOS DE SAÍDA ESPERADA

### 8.1 Exemplo: Card de Cartão (Light Mode)

```html
<article class="card-product">
  <div class="card-product__header">
    <img src="card-sapphire.png" alt="Chase Sapphire Preferred Card" class="card-product__image">
    <span class="badge badge--accent">Popular</span>
  </div>

  <div class="card-product__body">
    <h3 class="card-product__name">Chase Sapphire Preferred</h3>
    <p class="card-product__issuer">Chase Ultimate Rewards</p>

    <div class="card-product__bonus">
      <span class="value">75,000</span>
      <span class="label">pts welcome bonus</span>
    </div>

    <ul class="card-product__rates">
      <li><span class="rate">5x</span> Travel via portal</li>
      <li><span class="rate">3x</span> Dining & Streaming</li>
      <li><span class="rate">1x</span> Everything else</li>
    </ul>
  </div>

  <footer class="card-product__footer">
    <span class="annual-fee">$95/year</span>
    <button class="btn-primary">Learn More</button>
  </footer>
</article>
```

```css
/* Estilos Light Mode para Card de Produto */
.card-product {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-card);
  transition: all var(--transition-normal);
}

.card-product:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-4px);
}

.card-product__header {
  position: relative;
  margin-bottom: var(--space-4);
}

.card-product__image {
  width: 100%;
  border-radius: var(--radius-lg);
}

.card-product__header .badge {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
}

.card-product__name {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-1);
}

.card-product__issuer {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-4);
}

.card-product__bonus {
  background: var(--gradient-primary-soft);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  text-align: center;
  margin-bottom: var(--space-4);
}

.card-product__bonus .value {
  display: block;
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-primary);
}

.card-product__bonus .label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.card-product__rates {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-5);
}

.card-product__rates li {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--color-divider);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.card-product__rates li:last-child {
  border-bottom: none;
}

.card-product__rates .rate {
  font-weight: var(--font-semibold);
  color: var(--color-success);
  min-width: 2.5rem;
}

.card-product__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-divider);
}

.annual-fee {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
```

### 8.2 Exemplo: Texto de Ebook

```markdown
## Capítulo 3: Transfer Partners — O Segredo dos Experts

Quando você transfere pontos do seu cartão de banco para um programa de companhia
aérea ou hotel, está fazendo o que chamamos de **arbitragem de valor**.

### Por que isso é tão poderoso?

Veja este exemplo real:

| Uso | Valor por Ponto |
|-----|-----------------|
| Cash back simples | 1.0¢ |
| Portal de viagens | 1.25¢ |
| Transfer para Hyatt | **2.1¢** |

O mesmo ponto Chase UR vale **mais que o dobro** quando transferido
estrategicamente!

> **💡 Dica de Insider**
> Nunca transfira pontos antes de encontrar a disponibilidade do voo/hotel.
> Transferências são geralmente irreversíveis.

### Sweet Spots que Poucos Conhecem

1. **United Polaris para Europa**: 70K pontos por trecho em Business Class
2. **Hyatt Cat 1-4**: Hotéis de $200-400/noite por apenas 5K-15K pontos
3. **Flying Blue Promo Awards**: -50% em rotas selecionadas mensalmente
```

---

## 9. CHECKLIST DE VALIDAÇÃO

Antes de entregar qualquer conteúdo, verifique:

**Conteúdo & Tom:**
- [ ] Segue a filosofia anti-sistema/anti-afiliado?
- [ ] Tom é direto, elegante, honesto?
- [ ] Nenhuma palavra proibida foi usada?
- [ ] Dados estão marcados como estimados quando aplicável?

**Design & Visual (Light Mode):**
- [ ] Usa APENAS Light Mode (sem dark mode)?
- [ ] Paleta de cores segue o design system definido?
- [ ] Hierarquia visual clara (títulos > corpo > auxiliar)?
- [ ] Sombras são sutis e elegantes (não pesadas)?
- [ ] Espaçamento segue o grid de 8px?
- [ ] Bordas e divisores são sutis (#e2e8f0)?
- [ ] Cores de destaque usadas estrategicamente (não decorativas)?
- [ ] Estados interativos definidos (hover, focus, active, disabled)?

**Código & Técnico:**
- [ ] Código está bem comentado e organizado?
- [ ] CSS usa custom properties do design system?
- [ ] Responsividade foi considerada?
- [ ] Acessibilidade básica está implementada (contraste 4.5:1+)?
- [ ] Transições são suaves (cubic-bezier, não linear)?
- [ ] Focus-visible implementado para navegação por teclado?

---

## 10. CONTATO E REFERÊNCIA

Este documento é a fonte única de verdade para o projeto Travel World.

**Arquivos de Referência:**
- `/Projeto/produtos/` → Guias detalhados de cada produto
- `/Projeto/demos/` → Interfaces HTML/CSS funcionais
- `/Projeto/demos/data/` → Dados simulados em JSON

**Versionamento:**
- v1.0 — 2026-01-14 — Versão inicial completa
- v1.1 — 2026-01-14 — Design System atualizado para Light Mode exclusivo; adicionados componentes expandidos, princípios UI/UX, iconografia e layouts padrão

---

*Construído para travel hackers que querem resultados reais, não promessas vazias.*
