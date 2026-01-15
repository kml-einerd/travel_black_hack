# MilesAI Demo Suite — Resumo Final

## O que mudou (resumo breve)
- **Design system consolidado** com nova paleta, tipografia Satoshi/General Sans e sombras neutras.
- **CSS/JS unificados** em quatro arquivos (tokens, componentes, layouts, utilidades) e quatro módulos JS (utils, components, feeds, calculators).
- **Urgência reduzida** (countdowns atualizam a cada 60s e badges informativos).
- **Ícones por SVG** via `data-icon` (sem emojis).
- **Imagens locais** adicionadas em `demos/imagens/` e conectadas às páginas via JSON.

## Como acessar as páginas finais
1. Rode um servidor local na pasta `demos`:
   ```bash
   python -m http.server 8000
   ```
2. Abra no navegador as páginas principais (todas já atualizadas):
   - **Home**: `http://127.0.0.1:8000/index.html`
   - **Dashboard**: `http://127.0.0.1:8000/dashboard/index.html`
   - **Calculator (Cash vs Points)**: `http://127.0.0.1:8000/calculators/cash-vs-points.html`
   - **News Hub**: `http://127.0.0.1:8000/news/news-hub.html`
   - **Hot Deals**: `http://127.0.0.1:8000/news/hot-deals-flash.html`
   - **Card Universe**: `http://127.0.0.1:8000/news/card-universe-feed.html`
   - **Market Pulse**: `http://127.0.0.1:8000/news/market-pulse.html`
   - **Transfer Bonus Tracker**: `http://127.0.0.1:8000/news/transfer-bonus-tracker.html`
   - **Community Wins**: `http://127.0.0.1:8000/news/community-wins.html`
   - **Stories**: `http://127.0.0.1:8000/news/stories.html`
   - **Learn (Hacks)**: `http://127.0.0.1:8000/learn/hacks-library.html`
   - **Learn (Guides)**: `http://127.0.0.1:8000/learn/quick-guides.html`
   - **Daily Tip**: `http://127.0.0.1:8000/learn/daily-tip.html`
   - **Ebooks**: `http://127.0.0.1:8000/ebooks/zero-to-100k.html`
   - **Courses**: `http://127.0.0.1:8000/courses/points-101.html`
   - **Tools (AI Concierge)**: `http://127.0.0.1:8000/tools/ai-concierge.html`
   - **Tools (Trip Comparison)**: `http://127.0.0.1:8000/tools/trip-comparison.html`

> Dica: todas as páginas ligam entre si pelos menus internos para navegação rápida.
