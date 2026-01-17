# 🛠️ Guia Completo de Skills Claude

Este documento explica todas as **47 skills** instaladas, organizadas por categoria, com exemplos de uso prático.

---

## 📖 Como Usar

Para usar qualquer skill, basta digitar o comando com `/` seguido do nome:

```bash
/nome-da-skill [argumentos opcionais]
```

As skills são ativadas automaticamente quando o contexto é relevante, ou podem ser invocadas explicitamente.

---

## 📂 Categorias

### 🔧 Desenvolvimento & Código

| Skill | Comando | O que faz |
|-------|---------|-----------|
| **Test Driven Development** | `/test-driven-development` | Workflow TDD: escrever teste → falhar → código mínimo |
| **Software Architecture** | `/software-architecture` | Padrões SOLID, Clean Architecture, design patterns |
| **Feature Dev** | `/feature-dev` | Desenvolvimento de features em 7 fases guiadas |
| **Webapp Testing** | `/webapp-testing` | Testa apps web com Playwright, screenshots |
| **Subagent Development** | `/subagent-driven-development` | Subagentes paralelos com checkpoints de review |
| **Root Cause Tracing** | `/root-cause-tracing` | Rastreamento de erros até a causa original |
| **Using Git Worktrees** | `/using-git-worktrees` | Git worktrees para trabalho paralelo em branches |
| **Kaizen** | `/kaizen` | Melhoria contínua, error-proofing, iteração |

### 🎨 Frontend & Design

| Skill | Comando | O que faz |
|-------|---------|-----------|
| **Frontend Design** | `/frontend-design` | Interfaces distintas, evita "AI slop" |
| **Artifacts Builder** | `/artifacts-builder` | HTML artifacts com React + Tailwind + shadcn/ui |
| **Canvas Design** | `/canvas-design` | Arte visual em PNG/PDF para posters |
| **Theme Factory** | `/theme-factory` | 10 themes profissionais prontos para uso |
| **Brand Guidelines** | `/brand-guidelines` | Cores e tipografia de marca consistentes |
| **Image Enhancer** | `/image-enhancer` | Melhora qualidade de imagens e screenshots |
| **Imagen** | `/imagen` | Gera imagens para mockups, icons, ilustrações |

### 📝 Git & Pull Requests

| Skill | Comando | O que faz |
|-------|---------|-----------|
| **Commit** | `/commit` | Git commit com mensagem auto-gerada |
| **Commit Push PR** | `/commit-push-pr` | Commit + push + criar PR em um passo |
| **Clean Gone** | `/clean-gone` | Limpa branches locais deletadas no remote |
| **Code Review** | `/code-review` | Review automatizado de PRs |
| **Review PR** | `/review-pr` | Review completo com agentes especializados |

### 🤖 AI & Automação

| Skill | Comando | O que faz |
|-------|---------|-----------|
| **Ralph Loop** | `/ralph-loop` | Loops iterativos de desenvolvimento AI |
| **Hookify** | `/hookify` | Cria regras customizadas de comportamento |
| **Security Guidance** | `/security-guidance` | Alertas de segurança (XSS, eval, injection) |
| **Explanatory Output** | `/explanatory-output` | Insights educacionais durante o código |
| **Prompt Engineering** | `/prompt-engineering` | Técnicas de prompt engineering |
| **Skill Creator** | `/skill-creator` | Guia para criar suas próprias skills |
| **Skill Seekers** | `/skill-seekers` | Converte documentação em skills |

### 📄 Documentos & Arquivos

| Skill | Comando | O que faz |
|-------|---------|-----------|
| **DOCX** | `/docx` | Cria/edita Word com tracked changes |
| **PDF** | `/pdf` | Extrai texto, tabelas, merge/split PDFs |
| **PPTX** | `/pptx` | Lê/gera slides PowerPoint |
| **XLSX** | `/xlsx` | Manipula planilhas Excel |
| **Markdown to EPUB** | `/markdown-to-epub` | Converte MD para ebook EPUB |

### 🎬 Mídia & Conteúdo

| Skill | Comando | O que faz |
|-------|---------|-----------|
| **YouTube Transcript** | `/youtube-transcript` | Baixa transcrições do YouTube |
| **Video Downloader** | `/video-downloader` | Baixa vídeos com yt-dlp |
| **Article Extractor** | `/article-extractor` | Extrai texto de páginas web |
| **Content Research Writer** | `/content-research-writer` | Escreve conteúdo com pesquisa e citações |
| **Brainstorming** | `/brainstorming` | Ideação estruturada |
| **Tapestry** | `/tapestry` | Interliga documentos em redes de conhecimento |
| **NotebookLM Integration** | `/notebooklm-integration` | Integra com Google NotebookLM |

### 💼 Negócios & Marketing

| Skill | Comando | O que faz |
|-------|---------|-----------|
| **Competitive Ads Extractor** | `/competitive-ads-extractor` | Extrai e analisa ads de concorrentes |
| **Domain Name Brainstormer** | `/domain-name-brainstormer` | Gera ideias de domínios |
| **Internal Comms** | `/internal-comms` | Comunicações internas e updates |
| **Lead Research Assistant** | `/lead-research-assistant` | Pesquisa e qualifica leads |

### 📁 Produtividade & Organização

| Skill | Comando | O que faz |
|-------|---------|-----------|
| **File Organizer** | `/file-organizer` | Organiza arquivos inteligentemente |
| **Invoice Organizer** | `/invoice-organizer` | Organiza faturas para impostos |
| **Postgres** | `/postgres` | Queries SQL read-only em PostgreSQL |
| **Family History Research** | `/family-history-research` | Pesquisa genealógica |

---

## 🚀 Exemplos de Workflow

### Desenvolvimento de Feature Completa
```bash
/feature-dev Add user authentication
# → 7 fases: Discovery → Exploration → Questions → Architecture → Implementation → Review → Summary
```

### Criar e Revisar PR
```bash
/commit                 # Cria commit com mensagem automática
/commit-push-pr         # Commit + push + abre PR
/code-review            # Review automatizado
```

### Processar Documentos
```bash
/pdf                    # Extrair texto de PDF
/xlsx                   # Manipular planilha
/docx                   # Editar Word com tracked changes
/markdown-to-epub       # Converter para ebook
```

### Design Frontend
```bash
/frontend-design        # Criar interface distintiva
/artifacts-builder      # Montar artifact com React/Tailwind
/theme-factory          # Aplicar theme profissional
```

### Pesquisa e Conteúdo
```bash
/youtube-transcript [URL]  # Baixar transcrição
/article-extractor         # Extrair artigo de página
/brainstorming             # Estruturar ideias
/content-research-writer   # Escrever com pesquisa
```

---

## 📍 Localização

Todas as skills estão em:
```
.agent/workflows/
```

Total: **47 skills** instaladas e prontas para uso.
