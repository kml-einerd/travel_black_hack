# Manual Técnico: Cursos com IA

## Data de Criação: 13 de Janeiro de 2026

### 1. Time de Desenvolvimento (Personas BlackHat World)

- **Arquiteto de Sistema (System Architect) - "The_Oracle":** Projeta o pipeline de processamento de conteúdo, desde o scraping até a publicação, garantindo a escalabilidade e a modularidade do sistema.

- **Engenheiro de Backend (Backend Engineer) - "Code_Slinger":** Desenvolve os robôs de scraping, a API de processamento de conteúdo e a integração com os serviços de IA (NLP, TTS, Geração de Imagem).

- **Engenheiro de Frontend (Frontend Engineer) - "Pixel_Perfect":** Cria a plataforma de e-learning no superapp, incluindo o catálogo de cursos, o player de vídeo interativo e a interface das lições.

- **Especialista em IA e Dados (AI & Data Specialist) - "Data_Wrangler":** É o maestro da orquestra de IA. Ele desenvolve os prompts, fine-tuna os modelos, e cria os scripts que transformam dados brutos em conteúdo educacional estruturado e engajador.

- **Growth Hacker - "Money_Maker":** Define a estratégia de monetização dos cursos, o modelo de acesso freemium/premium e as campanhas de marketing para promover o conteúdo educacional.

### 2. Stack de Tecnologias

- **Frontend:** React (Vite) com TypeScript e Tailwind CSS. Player de vídeo customizado ou uma biblioteca como `Plyr` ou `Video.js`.
- **Backend:** Python (FastAPI) para orquestrar o pipeline de IA. Scrapy e Playwright para scraping.
- **Banco de Dados:** PostgreSQL para armazenar os dados estruturados dos cursos (`Course`, `Ebook`) e os roteiros gerados. Vector Database (ex: Pinecone, Weaviate) para armazenar embeddings do conteúdo para busca semântica.
- **IA:**
  - **NLP/Geração de Texto:** Claude 3 (Opus) para estruturar dados, gerar roteiros e textos.
  - **Text-to-Speech (TTS):** API da ElevenLabs ou OpenAI TTS para narrações com vozes neurais.
  - **Geração de Imagem/Vídeo:** Slides gerados com `md-to-pdf` ou `WeasyPrint` e convertidos para imagens. Ilustrações geradas com Midjourney ou Stable Diffusion via API. Montagem de vídeo com `FFmpeg`.
- **Infraestrutura:** Docker e AWS (ECS, S3 para armazenar mídia, RDS, Lambda para tarefas assíncronas).

### 3. Desenvolvimento com Vibecoding no Claude Code

**Fase 1: Pipeline de Conteúdo (Data_Wrangler & Code_Slinger)**

1.  **Prompt para Claude Code:** "Crie um script em Python que use a biblioteca `newspaper3k` para extrair o conteúdo principal de uma lista de URLs. O script deve salvar o texto limpo em arquivos .txt, nomeados com o slug da URL."

2.  **Prompt para Claude Code:** "Desenvolva uma função em Python que leia o conteúdo de um arquivo .txt e use a API do Claude 3 para estruturá-lo em um formato JSON, seguindo o modelo `Course` e `Ebook` da nossa arquitetura. O prompt para a IA deve instruí-la a criar módulos e lições lógicas a partir do texto. Salve o JSON de saída."

3.  **Prompt para Claude Code:** "Crie um endpoint na API FastAPI que receba um roteiro de texto e use a API da ElevenLabs para gerar um arquivo de áudio .mp3. Salve o arquivo no S3 e retorne a URL."

**Fase 2: Geração de Mídia (Code_Slinger)**

1.  **Prompt para Claude Code:** "Escreva uma função em Python que receba um texto em Markdown (conteúdo do slide) e use a biblioteca `WeasyPrint` para convertê-lo em um PDF. Em seguida, use `pdf2image` para converter cada página do PDF em uma imagem PNG."

2.  **Prompt para Claude Code:** "Crie um script que use `FFmpeg` para combinar uma sequência de imagens (slides) com um arquivo de áudio (narração) para criar um arquivo de vídeo .mp4. A duração de cada slide deve ser sincronizada com o áudio."

3.  **Prompt para Claude Code:** "Orquestre todo o processo com uma função assíncrona. Dado o JSON de um curso, a função deve iterar por cada lição, gerar o áudio, gerar os slides, montar o vídeo e atualizar o banco de dados com as URLs da mídia gerada."

**Fase 3: Plataforma de E-learning (Pixel_Perfect)**

1.  **Prompt para Claude Code:** "Crie um componente React para um catálogo de cursos. Ele deve buscar os cursos da API e exibi-los em um grid. Cada card de curso deve mostrar o título, descrição e nível de dificuldade."

2.  **Prompt para Claude Code:** "Desenvolva a página de um curso, que mostre a lista de módulos e lições à esquerda e o conteúdo da lição selecionada à direita. Use o `react-router` para navegar entre as lições."

3.  **Prompt para Claude Code:** "Crie um componente de player de vídeo que receba a URL do vídeo da lição. Adicione um painel de abas abaixo do vídeo com 'Roteiro', 'Recursos' e 'Quiz'. O conteúdo para estas abas virá dos dados da lição no banco de dados."

### 4. Prompts para Geração de Elementos Visuais (IA de Imagem)

- **Prompt para Template de Slide:** "Um template de slide para uma apresentação de curso online. O design deve ser limpo, profissional e moderno. O fundo deve ser branco, com uma barra lateral azul escura contendo o logo do superapp. O título do slide deve estar em uma fonte sans-serif em negrito. O corpo do texto deve ser legível. Deixe um espaço para ilustrações."

- **Prompt para Ilustração de 'Welcome Offer':** "Uma ilustração de um cartão de crédito com um laço de presente em volta dele, e moedas de ouro saindo dele. Estilo flat design, com cores vibrantes."

- **Prompt para Ilustração de 'Airline Alliances':** "Um mapa do mundo estilizado, com três logos de alianças aéreas (Star Alliance, oneworld, SkyTeam) e linhas conectando os principais hubs. Estilo infográfico, com cores distintas para cada aliança."
