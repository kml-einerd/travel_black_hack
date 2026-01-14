# Manual Técnico: Programa de Gamificação '90-Day Points Metamorphosis'

## Data de Criação: 13 de Janeiro de 2026

### 1. Time de Desenvolvimento (Personas BlackHat World)

- **Arquiteto de Sistema (System Architect) - "The_Oracle":** Desenha a arquitetura do sistema de gamificação, incluindo o modelo de dados para missões, progresso do usuário e leaderboards. Garante que o sistema seja engajador e resistente a fraudes.

- **Engenheiro de Backend (Backend Engineer) - "Code_Slinger":** Implementa a lógica do programa no backend, incluindo o agendamento de missões diárias, a validação da conclusão das missões e a atribuição de recompensas (XP, badges).

- **Engenheiro de Frontend (Frontend Engineer) - "Pixel_Perfect":** Cria a interface do programa de gamificação, focando em elementos visuais que incentivem o engajamento, como barras de progresso, animações de recompensa e um leaderboard dinâmico.

- **Especialista em IA e Dados (AI & Data Specialist) - "Data_Wrangler":** Desenvolve algoritmos para personalizar as missões com base no perfil e progresso do usuário, tornando o desafio mais relevante e eficaz para cada indivíduo.

- **Growth Hacker - "Money_Maker":** Projeta a estratégia de marketing para o programa, posicionando-o como um produto premium e um caminho claro para se tornar um expert em travel hacking.

### 2. Stack de Tecnologias

- **Frontend:** React (Vite) com TypeScript e Tailwind CSS. Bibliotecas de animação como `Framer Motion` para uma UX mais rica.
- **Backend:** Node.js (Fastify) com um agendador de tarefas (como `node-cron`) para as missões diárias. Python para os scripts de IA de personalização.
- **Banco de Dados:** PostgreSQL para armazenar os dados das missões, o progresso do usuário (`user_progress`) e os scores. Redis para o leaderboard em tempo real.
- **IA:** Claude 3 (Opus) para gerar o texto das missões e as dicas diárias. Modelos de classificação simples para personalizar a dificuldade das missões.
- **Infraestrutura:** Docker, AWS (ECS, RDS, ElastiCache).

### 3. Desenvolvimento com Vibecoding no Claude Code

**Fase 1: Estrutura do Programa (The_Oracle & Code_Slinger)**

1.  **Prompt para Claude Code:** "Defina os modelos de dados no PostgreSQL para `Mission`, `UserMissionProgress` e `Badge`. A `Mission` deve ter campos como `day` (1 a 90), `title`, `description`, `task_type` (ex: 'read', 'quiz', 'apply_card'), `xp_reward` e `badge_id` (opcional)."

2.  **Prompt para Claude Code:** "Crie um script de seed em Python que popule a tabela `Mission` com as 90 missões do programa. Use o Claude 3 para gerar o conteúdo de cada missão, seguindo uma curva de aprendizado progressiva."

3.  **Prompt para Claude Code:** "No backend em Node.js, crie um job com `node-cron` que rode todo dia à meia-noite. O job deve verificar quais usuários estão ativos no programa e criar as entradas para a missão do dia na tabela `UserMissionProgress`."

**Fase 2: Validação e Recompensas (Code_Slinger)**

1.  **Prompt para Claude Code:** "Crie um endpoint de API `POST /missions/complete` que receba um `mission_id`. A lógica deve:
    a. Verificar se a missão pode ser completada (ex: se for um quiz, verificar a resposta).
    b. Marcar a missão como `completed` na tabela `UserMissionProgress`.
    c. Adicionar o `xp_reward` ao score total do usuário.
    d. Se houver um `badge_id`, associar o badge ao usuário.
    e. Atualizar o score do usuário no leaderboard do Redis (que é um `Sorted Set`)."

**Fase 3: Interface de Gamificação (Pixel_Perfect)**

1.  **Prompt para Claude Code:** "Crie um componente React para o dashboard do programa. Ele deve mostrar a missão do dia em destaque, com uma descrição clara da tarefa e um botão de ação. Use `Framer Motion` para animar a entrada do card da missão."

2.  **Prompt para Claude Code:** "Desenvolva um componente de 'Trilha de Progresso'. Ele deve exibir 90 ícones, representando cada dia do programa. Os ícones dos dias concluídos devem ter uma cor diferente e mostrar o badge conquistado (se houver) ao passar o mouse."

3.  **Prompt para Claude Code:** "Crie um componente de Leaderboard que busque os dados do Redis (via API do backend) e mostre o top 10 de usuários, com seus avatares, nomes e XP total. O ranking deve ter uma animação sutil ao ser atualizado."

### 4. Prompts para Geração de Elementos Visuais (IA de Imagem)

- **Prompt para Badge 'First Card Applied':** "Um badge de bronze, com o contorno de um cartão de crédito e uma estrela no centro. Estilo de ícone de jogo, brilhante e atraente."

- **Prompt para Badge 'First Redemption':** "Um badge de prata, com o ícone de uma passagem aérea decolando. Estilo metálico, com reflexos."

- **Prompt para Badge '90-Day Master':** "Um badge de ouro e platina, com uma coroa de louros em volta de um globo terrestre. No centro do globo, um avião de primeira classe. O badge deve parecer prestigioso e épico."

- **Prompt para Animação de 'Missão Completa':** "Uma explosão de confetes e estrelas douradas, com um som de 'sucesso'. A animação deve ser rápida e satisfatória, aparecendo sobre o botão da missão após a conclusão."
