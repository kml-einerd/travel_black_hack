# Manual Técnico: Simulador de Estratégias de Acúmulo

## Data de Criação: 13 de Janeiro de 2026

### 1. Time de Desenvolvimento (Personas BlackHat World)

- **Arquiteto de Sistema (System Architect) - "The_Oracle":** Lidera o design da arquitetura, garantindo que o simulador seja robusto, escalável e se integre perfeitamente com a base de dados de cartões e os perfis de usuário.

- **Engenheiro de Backend (Backend Engineer) - "Code_Slinger":** Desenvolve o motor de simulação em Python, criando os algoritmos que processam os gastos do usuário, aplicam os multiplicadores dos cartões e projetam o acúmulo de pontos ao longo do tempo.

- **Engenheiro de Frontend (Frontend Engineer) - "Pixel_Perfect":** Cria a interface do simulador em React, focando em uma experiência de usuário fluida e em visualizações de dados claras e impactantes (gráficos e tabelas).

- **Especialista em IA e Dados (AI & Data Specialist) - "Data_Wrangler":** Implementa a lógica de recomendação de cartões, usando machine learning para sugerir o portfólio ideal com base no perfil de gastos e nos objetivos do usuário.

- **Growth Hacker - "Money_Maker":** Estrutura o modelo de monetização freemium/premium e integra os links de afiliado de forma estratégica nas recomendações de cartões.

### 2. Stack de Tecnologias

- **Frontend:** React (Vite) com TypeScript, Tailwind CSS e uma biblioteca de gráficos como `Recharts` ou `Chart.js`.
- **Backend:** Python (Flask ou FastAPI) para o motor de simulação e a API de recomendação. A lógica de negócio principal será em Python devido à sua força em análise de dados.
- **Banco de Dados:** PostgreSQL para armazenar os dados dos `CreditCard` e os perfis de usuário.
- **IA:** Scikit-learn para o modelo de recomendação de cartões e Claude 3 (Opus) para gerar as explicações em texto das estratégias recomendadas.
- **Infraestrutura:** Docker e AWS (ECS, RDS).

### 3. Desenvolvimento com Vibecoding no Claude Code

**Fase 1: Motor de Simulação (Code_Slinger & The_Oracle)**

1.  **Prompt para Claude Code:** "Crie um projeto Python com FastAPI. Configure um endpoint `/simulate` que aceite um objeto JSON com `current_cards` (lista de IDs de cartões), `monthly_spending` (objeto com categorias e valores) e `goal_points` (número)."

2.  **Prompt para Claude Code:** "Desenvolva uma classe `Simulator` em Python. Ela deve ter um método `run` que recebe os dados do endpoint. O método deve:
    a. Buscar os dados dos `current_cards` no banco de dados.
    b. Calcular o acúmulo mensal de pontos com base nos `monthly_spending` e nos `earning_rates` dos cartões.
    c. Projetar o tempo em meses para atingir os `goal_points`.
    d. Retornar um objeto com o resultado da simulação."

**Fase 2: Lógica de Recomendação com IA (Data_Wrangler)**

1.  **Prompt para Claude Code:** "Escreva um script Python que treine um modelo de recomendação (usando `scikit-learn` com um algoritmo como `k-Nearest Neighbors` ou uma abordagem baseada em conteúdo). O modelo deve receber um perfil de gastos e retornar uma lista de IDs de `CreditCard` que maximizem o acúmulo de pontos para aquele perfil."

2.  **Prompt para Claude Code:** "Integre o modelo treinado na API. Crie um novo método no `Simulator` chamado `recommend`. Este método deve:
    a. Chamar o modelo de recomendação com os `monthly_spending` do usuário.
    b. Gerar um novo cenário de simulação com os cartões recomendados.
    c. Usar o Claude 3 para gerar um texto explicativo: 'Recomendamos o Cartão X porque ele oferece 5x em supermercados, onde você gasta $500/mês...'."

**Fase 3: Interface do Simulador (Pixel_Perfect)**

1.  **Prompt para Claude Code:** "Crie um componente React com `react-hook-form` para um formulário de múltiplos passos. O primeiro passo coleta os gastos mensais por categoria. O segundo passo pede o objetivo de pontos."

2.  **Prompt para Claude Code:** "Desenvolva uma tela de resultados que mostre dois painéis lado a lado: 'Seu Cenário Atual' e 'Cenário Recomendado'. Use a biblioteca `Recharts` para criar um gráfico de linhas que compare a projeção de acúmulo de pontos dos dois cenários ao longo do tempo."

3.  **Prompt para Claude Code:** "Abaixo do gráfico, para o 'Cenário Recomendado', mostre os cards dos cartões recomendados (com imagem, nome e principais benefícios) e o texto explicativo gerado pela IA. Inclua um botão de 'Aplicar Agora' com o `affiliate_link` do cartão."

### 4. Prompts para Geração de Elementos Visuais (IA de Imagem)

- **Prompt para Gráfico de Projeção:** "Um gráfico de linhas limpo e moderno. A linha 'Recomendado' deve ser mais espessa e com um gradiente de azul para verde. A linha 'Atual' deve ser cinza pontilhada. O fundo deve ser branco, com eixos minimalistas."

- **Prompt para Ilustração do Formulário:** "Uma ilustração de uma pessoa em uma mesa, usando uma calculadora, com ícones de categorias de gastos (carrinho de compras, avião, garfo e faca) flutuando ao redor. Estilo flat design, paleta de cores do app."

- **Prompt para Ícone de 'Cenário Recomendado':** "Um ícone de um troféu dourado com uma estrela brilhante no topo. Estilo 3D, com sombras suaves."
