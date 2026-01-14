# Planejamento de Ebooks e Cursos com IA

## Data de Planejamento: 13 de Janeiro de 2026

### 1. Visão Geral da Estratégia Educacional

A estratégia educacional do superapp se baseia na criação de conteúdo de alta qualidade, gerado e otimizado por Inteligência Artificial, para educar os usuários em todos os níveis de conhecimento sobre milhas e viagens. O conteúdo será extraído das melhores fontes do setor, processado para garantir precisão e relevância, e apresentado em formatos engajadores como cursos em vídeo, ebooks e guias interativos.

### 2. Processo de Geração de Conteúdo com IA

O processo de criação de conteúdo será um pipeline automatizado, composto pelas seguintes etapas:

1.  **Scraping e Extração de Dados:** Robôs farão o scraping contínuo das fontes de referência (The Points Guy, Doctor of Credit, etc.) e de outras fontes identificadas. As informações serão extraídas e armazenadas em um banco de dados bruto.

2.  **Tratamento e Estruturação com IA:** Uma IA de processamento de linguagem natural (NLP) irá ler, entender, e estruturar os dados brutos. Ela irá identificar e categorizar informações, remover duplicatas, e normalizar os dados de acordo com a arquitetura definida (modelos `CreditCard`, `LoyaltyProgram`, `Deal`, etc.).

3.  **Geração de Conteúdo Base (JSON/YAML):** A IA irá gerar o conteúdo base para os cursos e ebooks em formato JSON ou YAML, seguindo os modelos `Course` e `Ebook`. Isso inclui roteiros para vídeos, conteúdo para slides, e o texto completo dos ebooks.

4.  **Geração de Mídia com IA:**
    *   **Voz:** Os roteiros dos vídeos serão convertidos em áudio usando uma API de Text-to-Speech (TTS) com vozes neurais de alta qualidade.
    *   **Vídeos e Slides:** A IA irá gerar os slides das apresentações a partir do conteúdo em Markdown. Para ilustrações e elementos visuais, serão utilizados modelos de geração de imagem (Text-to-Image) a partir de prompts específicos.

5.  **Montagem e Publicação:** O conteúdo gerado (vídeos, áudios, textos) será montado e publicado na plataforma do superapp, associado aos respectivos cursos e ebooks.

### 3. Catálogo de Cursos e Ebooks

#### Cursos em Vídeo

1.  **Curso: Miles and Points 101**
    *   **Nível:** Iniciante
    *   **Descrição:** Um curso completo para quem está começando no mundo das milhas e pontos. Cobre desde os conceitos básicos até a primeira emissão de passagem.
    *   **Módulos:** Foundations, Understanding Earning, Understanding Redeeming, Booking, Maximizing Your Points.

2.  **Curso: Do Zero à Primeira Classe**
    *   **Nível:** Intermediário
    *   **Descrição:** Focado em estratégias avançadas para maximizar o valor dos pontos e viajar em classes premium. Cobre alianças aéreas, transfer partners, e hacks de emissão.
    *   **Módulos:** Advanced Redemption Strategies, Airline Alliances, Maximizing Transfer Partners, Booking Complex Itineraries.

3.  **Curso: The Credit Card Master**
    *   **Nível:** Avançado
    *   **Descrição:** Um mergulho profundo no universo dos cartões de crédito, ensinando a construir um portfólio de cartões, otimizar gastos e aproveitar todos os benefícios.
    *   **Módulos:** Building Your Card Portfolio, Advanced Spending Strategies, Maximizing Card Benefits, The Business of Credit Cards.

#### Ebooks

1.  **Ebook: O Manual do Travel Hacker**
    *   **Descrição:** Um guia completo com as melhores estratégias, hacks e ferramentas para economizar em viagens. Será um compilado das melhores dicas dos especialistas.

2.  **Ebook: Guia Definitivo dos Programas de Lealdade**
    *   **Descrição:** Uma análise detalhada de cada programa de lealdade (aéreo e de hotel), com suas regras, parceiros, e melhores formas de resgate.

3.  **Ebook: 50 Viagens Incríveis com Pontos**
    *   **Descrição:** Um ebook inspiracional com 50 exemplos práticos de viagens incríveis que podem ser feitas com pontos, incluindo o passo a passo de como emitir cada uma.

### 4. Prompts para Geração de Conteúdo

Os prompts para a IA serão estruturados para garantir a qualidade e consistência do conteúdo. Eles serão armazenados em um diretório separado (`/prompts`) e versionados.

**Exemplo de Prompt para Roteiro de Lição:**

```
Você é um especialista em milhas e viagens, e sua missão é criar o roteiro para uma vídeo-aula do curso 'Miles and Points 101'.

**Curso:** Miles and Points 101
**Módulo:** Understanding Earning
**Lição:** All About Welcome Offers

**Objetivo da Lição:** Explicar o que são ofertas de boas-vindas de cartões de crédito, como elas funcionam, e por que são a forma mais rápida de acumular pontos.

**Conteúdo a ser abordado:**
1.  Definição de 'welcome offer'.
2.  Exemplos de ofertas reais (usar dados do `CreditCard`).
3.  O que é 'minimum spend' e 'time frame'.
4.  Dicas para atingir o gasto mínimo de forma orgânica.
5.  Cuidados a serem tomados (regras dos bancos, etc.).

**Formato de Saída:**
- Roteiro em texto, com marcações para pausas e ênfase.
- Sugestões de elementos visuais para os slides (ex: "[Mostrar imagem do cartão Chase Sapphire Preferred]").
- Um resumo de 3 a 5 pontos-chave para o final do vídeo.
```

### 5. Próximos Passos

O próximo passo é desenvolver os manuais técnicos para a implementação destes recursos usando vibecoding, detalhando a integração com as APIs de IA e a estrutura do banco de dados para armazenar o conteúdo gerado.
