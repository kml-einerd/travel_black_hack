# Manual Técnico: Comparador de Valor em Tempo Real

## Data de Criação: 13 de Janeiro de 2026

### 1. Time de Desenvolvimento (Personas BlackHat World)

- **Arquiteto de Sistema (System Architect) - "The_Oracle":** Um membro sênior do fórum, conhecido por sua visão de longo prazo e habilidade em projetar sistemas escaláveis e à prova de futuro. Ele definirá a arquitetura geral, a integração de APIs e a estrutura do banco de dados.

- **Engenheiro de Backend (Backend Engineer) - "Code_Slinger":** Um programador experiente em Python e Node.js, especialista em scraping, automação e desenvolvimento de APIs. Ele será responsável por construir o motor de busca e a lógica de comparação.

- **Engenheiro de Frontend (Frontend Engineer) - "Pixel_Perfect":** Um desenvolvedor focado em React e Vue.js, com um olho clínico para UI/UX. Ele criará a interface do usuário, garantindo que seja intuitiva, responsiva e visualmente atraente.

- **Especialista em IA e Dados (AI & Data Specialist) - "Data_Wrangler":** Um expert em machine learning e processamento de linguagem natural. Ele treinará a IA para interpretar os dados de scraping e gerar as recomendações de valor (CPM).

- **Growth Hacker - "Money_Maker":** Um especialista em monetização e aquisição de usuários. Ele definirá as estratégias de funil de vendas, os modelos de assinatura e as táticas de marketing de afiliados.

### 2. Stack de Tecnologias

- **Frontend:** React (Vite) com TypeScript e Tailwind CSS.
- **Backend:** Node.js (Fastify) para a API principal e Python (Scrapy, Playwright) para os robôs de scraping.
- **Banco de Dados:** PostgreSQL para os dados estruturados e Redis para caching de sessões e resultados de busca.
- **IA:** Claude 3 (Opus) para processamento de dados e geração de recomendações, e um modelo de Text-to-Image para ícones e ilustrações.
- **Infraestrutura:** Docker para containerização e AWS (ECS, RDS, ElastiCache) para deploy.

### 3. Desenvolvimento com Vibecoding no Claude Code

O desenvolvimento será feito de forma iterativa e colaborativa, usando o Claude Code como um assistente de programação e um "pair programmer" de IA.

**Fase 1: Setup do Backend (The_Oracle & Code_Slinger)**

1.  **Prompt para Claude Code:** "Crie a estrutura de um projeto Node.js com Fastify e TypeScript. Inclua a configuração do ESLint, Prettier e um Dockerfile para produção. Adicione uma rota de health check."

2.  **Prompt para Claude Code:** "Desenvolva um serviço em Python com Scrapy para fazer scraping do preço de um voo em `site_da_companhia_aerea.com`. O script deve receber origem, destino e data como parâmetros e retornar o preço em dinheiro e em milhas. Use Playwright para lidar com JavaScript dinâmico."

3.  **Prompt para Claude Code:** "Crie uma API no Fastify que receba os dados do voo, chame o script de scraping em Python, e armazene o resultado em um cache do Redis por 15 minutos. A chave do cache deve ser `flight:ORIGEM:DESTINO:DATA`."

**Fase 2: Integração da IA (Data_Wrangler)**

1.  **Prompt para Claude Code:** "Escreva uma função em Python que receba os dados do voo (preço em cash, preço em milhas) e a valoração média do programa de lealdade (do banco de dados `LoyaltyProgram`). A função deve calcular o CPM, comparar com a média, e retornar um objeto com o valor do CPM e uma recomendação (ex: `{ cpm: 2.5, recommendation: 'good_deal' }`)."

2.  **Prompt para Claude Code:** "Integre esta função na API do Fastify. Após obter os dados do scraping, chame a função de cálculo de CPM e adicione o resultado à resposta da API."

**Fase 3: Desenvolvimento do Frontend (Pixel_Perfect)**

1.  **Prompt para Claude Code:** "Crie um componente React com TypeScript e Tailwind CSS para um formulário de busca de voos, com campos para 'Origem', 'Destino' e 'Datas'. Use o `react-hook-form` para validação."

2.  **Prompt para Claude Code:** "Desenvolva um componente de card de resultado que exiba os dados do voo retornados pela API. O card deve mostrar o preço em dinheiro, o preço em milhas, e o CPM com um indicador de cor. O design deve ser limpo e moderno."

3.  **Prompt para Claude Code:** "Crie a lógica para chamar a API do backend quando o formulário for submetido e renderizar os cards de resultado na tela."

### 4. Prompts para Geração de Elementos Visuais (IA de Imagem)

- **Prompt para Ícone do App:** "Um ícone de app minimalista e moderno, combinando um avião de papel e uma moeda de ouro, com um gradiente de azul e dourado. Estilo flat design."

- **Prompt para Indicador de CPM (Bom):** "Um ícone de um foguete decolando, com um fundo verde vibrante. Estilo cartoonish e amigável."

- **Prompt para Indicador de CPM (Ruim):** "Um ícone de um cofrinho quebrado, com um fundo vermelho. Estilo simples e claro."

- **Prompt para Ilustração da Tela de Busca:** "Uma ilustração de uma pessoa olhando para um globo terrestre com várias rotas de avião desenhadas. A pessoa está segurando um cartão de crédito dourado. Estilo isométrico, com uma paleta de cores suaves."
