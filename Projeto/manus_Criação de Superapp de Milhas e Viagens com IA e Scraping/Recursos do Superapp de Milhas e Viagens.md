# Recursos do Superapp de Milhas e Viagens

## Data de Criação: 13 de Janeiro de 2026

### 1. Comparador de Valor em Tempo Real (Cash vs. Milhas)

**Conceito:**
Uma ferramenta que permite ao usuário comparar o custo de uma passagem aérea ou reserva de hotel em dinheiro (cash) versus o custo em pontos/milhas, calculando o valor de resgate em centavos por milha (CPM) em tempo real. Isso ajuda o usuário a decidir se vale a pena usar seus pontos ou pagar em dinheiro.

**Dinâmica para o Usuário:**
1. O usuário acessa a ferramenta "Comparador" no superapp.
2. Insere os detalhes da viagem: origem, destino, datas, e companhia aérea/hotel.
3. O sistema busca o preço em dinheiro e em pontos/milhas, utilizando scrapping e APIs de parceiros.
4. A interface exibe lado a lado: o preço em cash, a quantidade de pontos necessários, e o valor do CPM calculado.
5. O sistema exibe uma recomendação (ex: "Bom negócio! CPM de 2.5¢, acima da média de 1.8¢ para este programa.") baseada nas valuações do `LoyaltyProgram`.

**Interface e Navegação:**
- Tela de busca com campos para origem, destino e datas.
- Tela de resultados com um card para cada opção de voo/hotel, mostrando:
  - Preço em dinheiro.
  - Preço em pontos + taxas.
  - CPM calculado com um indicador de cor (verde para bom, amarelo para médio, vermelho para ruim).
  - Link para a fonte da oferta.

**Fontes de Dados:**
- `CreditCard`: Para identificar os programas de pontos do usuário.
- `LoyaltyProgram`: Para obter as valuações médias de CPM.
- `Deal`: Para promoções e ofertas especiais.
- **Scrapping em tempo real:** Sites de companhias aéreas e hotéis.
- **APIs:** AwardWallet para valuações, e parceiros de busca de voos.

**Monetização:**
- **Freemium:** Buscas limitadas por dia para usuários gratuitos.
- **Premium:** Buscas ilimitadas, alertas de CPM para rotas específicas, e histórico de buscas.

---

### 2. Simulador de Estratégias de Acúmulo

**Conceito:**
Uma ferramenta de planejamento que ajuda os usuários a otimizar o acúmulo de pontos. O usuário insere seus gastos mensais e um objetivo de viagem, e o simulador recomenda os melhores cartões de crédito e estratégias para atingir a meta mais rapidamente.

**Dinâmica para o Usuário:**
1. O usuário acessa o "Simulador de Estratégias".
2. Preenche um formulário com seus gastos mensais por categoria (supermercado, restaurantes, viagens, etc.).
3. Define um objetivo de viagem (ex: "Voo em primeira classe para o Japão, 150.000 pontos").
4. O simulador processa os dados e apresenta cenários:
   - **Cenário 1 (Cartões Atuais):** "Com seus cartões atuais, você atingirá sua meta em 24 meses."
   - **Cenário 2 (Recomendado):** "Se você adquirir o `CreditCard.name` e concentrar seus gastos em `earning_rates.category`, atingirá sua meta em 12 meses, graças ao `welcome_offer` e aos multiplicadores."

**Interface e Navegação:**
- Formulário para inserção de gastos e objetivos.
- Tela de resultados com gráficos comparativos entre os cenários.
- Detalhamento de cada cenário com os cartões recomendados e links de afiliado.

**Fontes de Dados:**
- `CreditCard`: Base de dados completa de cartões.
- `LoyaltyProgram`: Para entender os parceiros de transferência.
- **Dados do usuário:** Gastos e objetivos.

**Monetização:**
- **Freemium:** Simulações básicas com um objetivo.
- **Premium:** Simulações avançadas com múltiplos objetivos, análise de portfólio de cartões e recomendações personalizadas contínuas.

---

### 3. Cursos com IA: "Do Zero à Primeira Classe"

**Conceito:**
Uma plataforma de e-learning com cursos gerados e ministrados por IA. O conteúdo é extraído das fontes de referência, processado e estruturado em módulos e lições, com vídeos, slides e narração gerados por IA.

**Dinâmica para o Usuário:**
1. O usuário acessa a seção "Cursos" e escolhe um curso (ex: "Miles and Points 101").
2. Acessa a lista de módulos e lições.
3. Cada lição contém:
   - Um vídeo gerado por IA com slides e ilustrações.
   - O roteiro em texto para leitura.
   - Um resumo dos pontos-chave.
   - Um quiz para testar o conhecimento.

**Interface e Navegação:**
- Catálogo de cursos com filtros por nível e categoria.
- Player de vídeo com controles de velocidade e legendas.
- Área de texto com o conteúdo da lição e links para recursos.

**Fontes de Dados:**
- `Course`: Estrutura dos cursos, módulos e lições.
- `Ebook`: Conteúdo base para os roteiros.
- **Scrapping:** Conteúdo de The Points Guy, Daily Drop, etc., para alimentar a IA.

**Monetização:**
- **Freemium:** Acesso ao primeiro módulo de cada curso.
- **Premium:** Acesso completo a todos os cursos, certificados de conclusão e sessões de Q&A com especialistas (humanos).

---

### 4. Programa de Gamificação: "90-Day Points Metamorphosis"

**Conceito:**
Um programa de 90 dias que transforma um iniciante em um especialista em milhas através de missões diárias, gamificação e recompensas. O objetivo é construir o "músculo do travel hacking" de forma progressiva e engajadora.

**Dinâmica para o Usuário:**
1. O usuário se inscreve no programa "90-Day Points Metamorphosis".
2. A cada dia, recebe uma nova missão (ex: "Dia 5: Leia nosso guia sobre alianças aéreas e responda a 3 perguntas.", "Dia 20: Aplique para seu primeiro cartão de viagem com nosso link de afiliado e ganhe 500 pontos no app.").
3. Ao completar as missões, o usuário ganha pontos de experiência (XP), badges e sobe de nível.
4. Um leaderboard mostra o ranking dos participantes.

**Interface e Navegação:**
- Dashboard do programa com a missão do dia.
- Trilha de progresso com as 90 missões.
- Perfil do usuário com XP, nível, badges e posição no leaderboard.

**Fontes de Dados:**
- `Course`: Conteúdo para as missões teóricas.
- `CreditCard`: Para as missões de aplicação de cartão.
- **Dados do usuário:** Progresso e atividades.

**Monetização:**
- **Premium:** Acesso ao programa completo. Pode ser vendido como um produto separado ou parte da assinatura premium do superapp.
