# Arquitetura de Dados e Padrões - Superapp Milhas e Viagens

## Data de Definição: 13 de Janeiro de 2026

### 1. Visão Geral

A arquitetura de dados foi projetada para ser modular, escalável e otimizada para o processamento por IA. A estrutura utiliza um padrão de nomenclatura consistente e tipos de dados padronizados para garantir a interoperabilidade entre os diferentes recursos do superapp, cursos, ebooks e a base de conhecimento da IA. Todas as informações serão armazenadas em formato JSON ou YAML no banco de dados.

### 2. Padrões de Nomenclatura e Tipos

- **Nomenclatura:** `snake_case` para todos os campos.
- **Tipos de Dados Primitivos:** `string`, `number`, `boolean`, `date`, `datetime`.
- **Tipos de Dados Compostos:** `object`, `array`.
- **Identificadores:** Todos os IDs são `UUIDs` para garantir a unicidade global.

### 3. Modelos de Dados Principais (YAML)

#### 3.1. `CreditCard`

```yaml
- name: CreditCard
  title: Cartão de Crédito
  description: Representa um cartão de crédito com seus benefícios, taxas e ofertas.
  fields:
    - name: id
      type: string
      format: uuid
      description: Identificador único do cartão.
    - name: name
      type: string
      description: Nome do cartão (ex: Chase Sapphire Preferred® Card).
    - name: issuer
      type: string
      description: Emissor do cartão (ex: Chase, American Express).
    - name: network
      type: string
      description: Bandeira do cartão (ex: Visa, Mastercard).
    - name: welcome_offer
      type: object
      description: Oferta de boas-vindas.
      properties:
        - name: bonus_points
          type: number
          description: Pontos de bônus oferecidos.
        - name: minimum_spend
          type: number
          description: Gasto mínimo para obter o bônus.
        - name: time_frame_months
          type: number
          description: Período em meses para atingir o gasto mínimo.
        - name: expiration_date
          type: date
          description: Data de expiração da oferta.
    - name: earning_rates
      type: array
      description: Taxas de acúmulo de pontos por categoria.
      items:
        type: object
        properties:
          - name: category
            type: string
            description: Categoria de gasto (ex: Travel, Dining, Groceries).
          - name: multiplier
            type: number
            description: Multiplicador de pontos (ex: 3x, 5x).
    - name: annual_fee
      type: number
      description: Anuidade do cartão.
    - name: foreign_transaction_fee
      type: boolean
      description: Indica se há taxa para transações internacionais.
    - name: benefits
      type: array
      description: Lista de benefícios (ex: Airport Lounge Access, Travel Credits).
      items:
        type: string
    - name: affiliate_link
      type: string
      format: url
      description: Link de afiliado para aplicação.
    - name: source_url
      type: string
      format: url
      description: URL da fonte da informação.
```

#### 3.2. `LoyaltyProgram`

```yaml
- name: LoyaltyProgram
  title: Programa de Lealdade
  description: Representa um programa de lealdade de companhia aérea ou hotel.
  fields:
    - name: id
      type: string
      format: uuid
      description: Identificador único do programa.
    - name: name
      type: string
      description: Nome do programa (ex: American AAdvantage, World of Hyatt).
    - name: type
      type: string
      enum: [airline, hotel, bank, transferable]
      description: Tipo de programa.
    - name: partners
      type: array
      description: Lista de parceiros de transferência.
      items:
        type: object
        properties:
          - name: program_id
            type: string
            format: uuid
            description: ID do programa parceiro.
          - name: transfer_ratio
            type: string
            description: Razão de transferência (ex: 1:1, 2:1).
    - name: point_values
      type: array
      description: Histórico de valoração dos pontos.
      items:
        type: object
        properties:
          - name: date
            type: date
            description: Data da valoração.
          - name: value_cents
            type: number
            description: Valor em centavos de dólar por ponto.
          - name: source
            type: string
            description: Fonte da valoração (ex: The Points Guy, AwardWallet).
    - name: source_url
      type: string
      format: url
      description: URL da fonte da informação.
```

#### 3.3. `Deal`

```yaml
- name: Deal
  title: Oferta ou Promoção
  description: Representa uma oferta de tempo limitado para voos, hotéis ou cartões.
  fields:
    - name: id
      type: string
      format: uuid
      description: Identificador único da oferta.
    - name: title
      type: string
      description: Título da oferta.
    - name: description
      type: string
      description: Descrição detalhada da oferta.
    - name: type
      type: string
      enum: [flight, hotel, credit_card, other]
      description: Tipo de oferta.
    - name: start_date
      type: datetime
      description: Data de início da oferta.
    - name: end_date
      type: datetime
      description: Data de fim da oferta.
    - name: cpm_value
      type: number
      description: Valor em centavos por milha (CPM), se aplicável.
    - name: source_url
      type: string
      format: url
      description: URL da fonte da oferta.
```

#### 3.4. `Course`

```yaml
- name: Course
  title: Curso
  description: Representa um curso educacional sobre milhas e viagens.
  fields:
    - name: id
      type: string
      format: uuid
      description: Identificador único do curso.
    - name: title
      type: string
      description: Título do curso (ex: Do Zero à Primeira Classe).
    - name: description
      type: string
      description: Descrição do curso.
    - name: level
      type: string
      enum: [beginner, intermediate, advanced, expert]
      description: Nível de dificuldade do curso.
    - name: modules
      type: array
      description: Módulos do curso.
      items:
        type: object
        properties:
          - name: title
            type: string
            description: Título do módulo.
          - name: lessons
            type: array
            description: Lições do módulo.
            items:
              type: object
              properties:
                - name: title
                  type: string
                  description: Título da lição.
                - name: video_script
                  type: text
                  description: Roteiro do vídeo da lição.
                - name: slides_content
                  type: text
                  description: Conteúdo para os slides da lição (em Markdown).
                - name: voice_over_url
                  type: string
                  format: url
                  description: URL do áudio da narração.
```

#### 3.5. `Ebook`

```yaml
- name: Ebook
  title: Ebook
  description: Representa um ebook sobre milhas e viagens.
  fields:
    - name: id
      type: string
      format: uuid
      description: Identificador único do ebook.
    - name: title
      type: string
      description: Título do ebook.
    - name: description
      type: string
      description: Descrição do ebook.
    - name: content
      type: text
      format: markdown
      description: Conteúdo completo do ebook em Markdown.
    - name: source_urls
      type: array
      description: URLs das fontes usadas para gerar o conteúdo.
      items:
        type: string
        format: url
```

### 4. Próximos Passos

Com esta arquitetura de dados definida, o próximo passo é detalhar os recursos do superapp, utilizando estes modelos como base para a troca de informações e a lógica de negócio. A IA será treinada para entender e gerar conteúdo com base nestes esquemas, garantindo consistência e qualidade em todos os produtos.
