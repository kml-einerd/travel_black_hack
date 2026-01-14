# Prompts Estruturados para Geração de Conteúdo com IA

## Data de Criação: 13 de Janeiro de 2026

### 1. Prompts para Processamento de Dados (NLP)

#### Prompt 1.1: Estruturação de Conteúdo de Artigo em Modelo Course

```
Você é um especialista em educação e travel hacking. Sua tarefa é ler um artigo sobre milhas e pontos e estruturá-lo em um modelo de curso.

**Entrada:** Texto de um artigo (ex: "How to Book Award Flights")

**Tarefa:**
1. Identifique os tópicos principais do artigo.
2. Organize-os em uma estrutura de módulos e lições lógicas.
3. Para cada lição, crie um título, descrição e uma lista de pontos-chave.
4. Indique o nível de dificuldade (beginner, intermediate, advanced).

**Formato de Saída (JSON):**
{
  "course_title": "...",
  "course_level": "beginner|intermediate|advanced",
  "modules": [
    {
      "title": "...",
      "lessons": [
        {
          "title": "...",
          "description": "...",
          "key_points": ["...", "..."],
          "estimated_duration_minutes": 5
        }
      ]
    }
  ]
}
```

#### Prompt 1.2: Extração de Dados de Cartão de Crédito

```
Você é um especialista em cartões de crédito. Sua tarefa é extrair os dados de um cartão de crédito a partir de um texto ou página web.

**Entrada:** Texto descrevendo um cartão de crédito (ex: "Chase Sapphire Preferred: 75,000 bonus points, 3x on travel...")

**Tarefa:**
1. Extraia os dados estruturados do cartão.
2. Identifique as categorias de ganho de pontos e os multiplicadores.
3. Liste os benefícios principais.
4. Identifique a anuidade e outras taxas.

**Formato de Saída (JSON):**
{
  "name": "...",
  "issuer": "Chase",
  "welcome_offer": {
    "bonus_points": 75000,
    "minimum_spend": 5000,
    "time_frame_months": 3
  },
  "earning_rates": [
    {"category": "Travel", "multiplier": 3},
    {"category": "Dining", "multiplier": 3}
  ],
  "annual_fee": 95,
  "benefits": ["Travel Protections", "Airport Lounge Access"]
}
```

---

### 2. Prompts para Geração de Conteúdo Educacional

#### Prompt 2.1: Geração de Roteiro de Vídeo para Lição

```
Você é um professor experiente em travel hacking e um roteirista de vídeos educacionais. Sua tarefa é criar um roteiro envolvente para uma vídeo-aula.

**Contexto:**
- Curso: Miles and Points 101
- Módulo: Understanding Earning
- Lição: All About Welcome Offers
- Público-alvo: Iniciantes (sem conhecimento prévio)
- Duração esperada: 5 minutos

**Tarefa:**
1. Crie um roteiro com uma introdução cativante.
2. Desenvolva o conteúdo de forma progressiva e clara.
3. Inclua exemplos práticos e reais.
4. Termine com um resumo dos pontos-chave.
5. Indique onde devem ser inseridos elementos visuais (ex: "[MOSTRAR IMAGEM: Chase Sapphire Preferred Card]").

**Formato de Saída:**
[Roteiro em Markdown com marcações de tempo e elementos visuais]
```

#### Prompt 2.2: Geração de Conteúdo para Ebook

```
Você é um autor especializado em finanças pessoais e travel hacking. Sua tarefa é escrever um capítulo de um ebook.

**Contexto:**
- Ebook: O Manual do Travel Hacker
- Capítulo: Construindo Seu Portfólio de Cartões
- Público-alvo: Iniciantes a Intermediários
- Comprimento esperado: 2,000-3,000 palavras

**Tarefa:**
1. Escreva uma introdução que capture a atenção.
2. Desenvolva o conteúdo com estrutura clara (seções, subsseções).
3. Inclua exemplos práticos e estudos de caso.
4. Termine com conclusões e próximos passos.
5. Cite as fontes quando apropriado.

**Formato de Saída:**
[Conteúdo em Markdown com estrutura de headings]
```

---

### 3. Prompts para Geração de Recomendações com IA

#### Prompt 3.1: Recomendação de Cartão Baseada em Perfil de Gastos

```
Você é um consultor financeiro especializado em cartões de crédito e travel hacking. Sua tarefa é recomendar os melhores cartões para um usuário específico.

**Dados do Usuário:**
- Gastos mensais por categoria: {categoria: valor, ...}
- Objetivo de viagem: {destino, classe, valor em pontos}
- Cartões atuais: [lista de IDs de cartões]
- Nível de experiência: iniciante|intermediário|avançado

**Tarefa:**
1. Analise o perfil de gastos do usuário.
2. Identifique as categorias com maior gasto.
3. Recomende cartões que ofereçam multiplicadores altos nessas categorias.
4. Calcule o tempo para atingir o objetivo com os cartões recomendados.
5. Gere um texto explicativo convincente.

**Formato de Saída (JSON):**
{
  "recommended_cards": [
    {
      "card_id": "...",
      "reason": "...",
      "estimated_months_to_goal": 12
    }
  ],
  "explanation": "..."
}
```

#### Prompt 3.2: Geração de Missão Diária para Gamificação

```
Você é um game designer especializado em educação e engagement. Sua tarefa é criar uma missão diária para o programa "90-Day Points Metamorphosis".

**Contexto:**
- Dia: 15
- Nível de Dificuldade: Intermediário (o usuário já completou 14 dias)
- Tópicos Cobertos até Agora: Conceitos básicos, ganho de pontos, cartões
- Próximo Tópico: Resgate de pontos e alianças aéreas

**Tarefa:**
1. Crie uma missão que seja desafiadora mas alcançável.
2. Inclua um elemento educacional (ler, assistir, responder quiz).
3. Opcionalmente, inclua um elemento de ação (aplicar para cartão, fazer busca de voo).
4. Defina a recompensa (XP e possível badge).
5. Gere um texto motivador.

**Formato de Saída (JSON):**
{
  "day": 15,
  "title": "...",
  "description": "...",
  "task_type": "read|quiz|apply_card|search_flight",
  "task_details": {...},
  "xp_reward": 100,
  "badge_id": "...",
  "motivational_text": "..."
}
```

---

### 4. Prompts para Geração de Elementos Visuais

#### Prompt 4.1: Descrição para Geração de Imagem (Midjourney/Stable Diffusion)

```
Crie uma imagem para representar o conceito de "travel hacking" de forma inspiradora e moderna.

**Especificações:**
- Estilo: Flat design, cores vibrantes
- Elementos: Uma pessoa segurando um cartão de crédito dourado, um avião decolando ao fundo, moedas e pontos flutuando
- Paleta de cores: Azul, dourado, branco
- Resolução: 1920x1080 (16:9)
- Uso: Hero image para a landing page do superapp

**Prompt para Midjourney:**
"A modern, flat design illustration of a person holding a golden credit card with an airplane taking off in the background, surrounded by floating coins and points. Vibrant blue and gold color palette, clean and inspiring, 16:9 aspect ratio, high resolution."
```

#### Prompt 4.2: Descrição para Geração de Ícone

```
Crie um ícone para representar a funcionalidade "Comparador de Valor".

**Especificações:**
- Estilo: Flat design, minimalista
- Elementos: Uma balança com moedas de um lado e pontos/milhas do outro
- Paleta de cores: Azul escuro, branco, dourado
- Tamanho: 256x256 pixels
- Uso: Ícone de navegação no app

**Prompt para Midjourney:**
"A minimalist flat design icon of a balance scale with coins on one side and airplane miles/points on the other. Dark blue, white, and gold colors. 256x256 pixels, clean and professional."
```

---

### 5. Prompts para Otimização de Conversão

#### Prompt 5.1: Copywriting para CTA (Call-to-Action)

```
Você é um especialista em copywriting e conversão. Sua tarefa é criar um CTA convincente para um botão de "Aplicar Agora" em um cartão de crédito recomendado.

**Contexto:**
- Cartão: Chase Sapphire Preferred
- Bônus: 75,000 pontos
- Valor estimado: $1,500
- Público-alvo: Iniciantes em travel hacking

**Tarefa:**
Crie 3 variações de CTA, cada uma com um ângulo diferente:
1. Urgência: Enfatize a oferta limitada.
2. Valor: Enfatize o bônus em dólares.
3. Aspiração: Enfatize a viagem de sonho que é possível.

**Formato de Saída:**
1. "[CTA 1]"
2. "[CTA 2]"
3. "[CTA 3]"
```

---

## 📝 Instruções de Uso

1. **Seleção de Prompt:** Escolha o prompt mais apropriado para sua tarefa.
2. **Personalização:** Adapte os placeholders (ex: `{categoria}`, `[lista]`) com seus dados específicos.
3. **Execução:** Use a API do Claude 3 (Opus) com o prompt completo.
4. **Validação:** Revise a saída e valide a qualidade e relevância.
5. **Iteração:** Se necessário, refine o prompt e execute novamente.

---

## 🔄 Versionamento

- **Versão 1.0:** Prompts iniciais para MVP do superapp.
- **Próximas versões:** Prompts adicionais para recursos secundários, otimizações de conversão e personalizações avançadas.

---

**Desenvolvido por:** Manus AI  
**Data:** 13 de Janeiro de 2026
