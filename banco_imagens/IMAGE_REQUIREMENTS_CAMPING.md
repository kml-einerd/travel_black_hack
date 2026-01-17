# Requisitos de Imagens - Camping Adventure Design

Este documento especifica as imagens necessarias para o novo design de camping, incluindo formato, dimensao e direcionamentos para insercao adequada.

---

## Paleta de Cores do Design

Todas as imagens devem harmonizar com a paleta:

- **Verde Principal:** #0BA457
- **Verde Escuro (Backgrounds):** #0D3B28, #072A1C
- **Laranja/Vermelho (Destaque):** #DF5030
- **Charcoal (Texto):** #101828
- **Branco:** #FFFFFF

---

## 1. IMAGENS DE HERO / BACKGROUNDS

### 1.1 Hero Principal (hero-forest.jpg)
- **Localizacao:** `demos/images/destinations/hero-forest.jpg`
- **Dimensao:** 1920x1080px (16:9) - minimo 1400x800px
- **Formato:** JPG ou WebP
- **Conteudo:** Paisagem de floresta densa com tons verdes profundos
- **Elementos ideais:**
  - Floresta de pinheiros ou mata verde
  - Luz natural suave (golden hour ou dia nublado)
  - Profundidade de campo com blur natural ao fundo
- **Direcao de insercao:**
  - Usar `object-fit: cover`
  - Overlay de gradiente verde escuro ja aplicado via CSS
  - Nao precisa de bordas ou espacamento extra

### 1.2 Background Montanhas (mountain-bg.jpg)
- **Localizacao:** `demos/images/destinations/mountain-bg.jpg`
- **Dimensao:** 1920x1200px
- **Formato:** JPG ou WebP
- **Conteudo:** Paisagem montanhosa com vales verdes
- **Elementos ideais:**
  - Montanhas com neve no topo
  - Vales verdes em primeiro plano
  - Ceu com nuvens dramaticas
  - Trilha visivel ao longe

---

## 2. CARDS DE DESTINOS

### 2.1 Destinos - Cards Verticais
- **Localizacao:** `demos/images/destinations/`
- **Dimensao:** 800x600px (4:3)
- **Formato:** WebP preferido, JPG aceitavel
- **Quantidade necessaria:** 8-12 imagens

**Lista de imagens necessarias:**

| Nome do Arquivo | Conteudo | Notas |
|-----------------|----------|-------|
| `lake-camp.webp` | Lago com barraca na margem | Reflexo na agua |
| `forest-trail.webp` | Trilha na floresta | Luz filtrada |
| `mountain-view.webp` | Vista panoramica montanha | Mirante ou pico |
| `riverside-camp.webp` | Camping beira de rio | Agua corrente |
| `sunset-tent.webp` | Barraca ao por-do-sol | Cores quentes |
| `morning-mist.webp` | Acampamento com neblina | Atmosferico |
| `campfire-night.webp` | Fogueira a noite | Iluminacao quente |
| `alpine-meadow.webp` | Prado alpino | Flores silvestres |

**Direcao de insercao:**
- Cards usam `border-radius: 20px`
- Imagem deve ser centralizada
- Overlay gradiente escuro na parte inferior (via CSS)
- Evitar elementos importantes nos cantos (serao cortados)

---

## 3. ICONES E ILUSTRACOES

### 3.1 Icone de Barraca (tent-icon.svg)
- **Localizacao:** `demos/images/core/tent-icon.svg`
- **Dimensao:** 64x64px, escalavel
- **Formato:** SVG
- **Cor:** Monochrome, usar currentColor
- **Estilo:** Linha fina (stroke-width: 2px)

### 3.2 Ilustracao de Acampamento (camp-illustration.svg)
- **Localizacao:** `demos/images/core/camp-illustration.svg`
- **Dimensao:** 400x300px
- **Formato:** SVG
- **Conteudo:**
  - Barraca laranja/coral (#DF5030)
  - Arvores verdes estilizadas
  - Fogueira com chamas
  - Opcional: montanhas ao fundo
- **Estilo:** Flat/minimalista, cores solidas

### 3.3 Marcador de Mapa (map-marker.svg)
- **Localizacao:** `demos/images/core/map-marker.svg`
- **Dimensao:** 48x60px
- **Formato:** SVG
- **Cor:** #DF5030 (laranja do design)
- **Forma:** Gota invertida com icone de barraca interno

---

## 4. IMAGENS DE USUARIO / AVATARES

### 4.1 Avatar Placeholder
- **Localizacao:** `demos/images/core/avatar-placeholder.png`
- **Dimensao:** 200x200px
- **Formato:** PNG com transparencia
- **Conteudo:** Silhueta de pessoa ou icone generico
- **Cor de fundo:** Transparente ou verde claro #E8F8F0

### 4.2 Avatares de Exemplo
- **Localizacao:** `demos/images/users/`
- **Dimensao:** 100x100px
- **Formato:** JPG
- **Quantidade:** 6-8 avatares diversos
- **Insercao:** Sempre em containers circulares (`border-radius: 50%`)

---

## 5. IMAGENS DE WEATHER / CLIMA

### 5.1 Icones de Clima (SVG Set)
- **Localizacao:** `demos/images/weather/`
- **Dimensao:** 48x48px
- **Formato:** SVG
- **Lista necessaria:**
  - `sunny.svg` - Sol
  - `cloudy.svg` - Nublado
  - `rainy.svg` - Chuva
  - `stormy.svg` - Tempestade
  - `snowy.svg` - Neve
  - `windy.svg` - Vento
  - `foggy.svg` - Neblina

---

## 6. IMAGENS DE EQUIPAMENTOS / GEAR

### 6.1 Cards de Equipamentos
- **Localizacao:** `demos/images/gear/`
- **Dimensao:** 400x400px (1:1)
- **Formato:** PNG com fundo transparente ou branco
- **Lista sugerida:**
  - `tent-product.png`
  - `backpack-product.png`
  - `sleeping-bag.png`
  - `camping-stove.png`
  - `lantern.png`
  - `hiking-boots.png`

---

## 7. PREVIEW DE VIRTUAL TOUR

### 7.1 Preview Card (campsite-preview.jpg)
- **Localizacao:** `demos/images/destinations/campsite-preview.jpg`
- **Dimensao:** 400x250px
- **Formato:** JPG ou WebP
- **Conteudo:** Vista panoramica de campsite
- **Notas:** Imagem que sugira experiencia 360

---

## Especificacoes Tecnicas Gerais

### Otimizacao
- **WebP:** Preferido para fotos (40-60% menor que JPG)
- **SVG:** Obrigatorio para icones e ilustracoes
- **PNG:** Apenas quando transparencia e necessaria

### Compressao
- **JPG/WebP:** Qualidade 80-85%
- **PNG:** Usar pngquant ou similar
- **Target:** < 150KB por imagem de hero, < 50KB para cards

### Resolucao
- Todas as fotos devem ter versao @2x para Retina
- Nomear: `image.jpg` e `image@2x.jpg`

### Aspect Ratios Utilizados
| Uso | Ratio | Exemplo |
|-----|-------|---------|
| Hero | 16:9 | 1920x1080 |
| Card Destino | 4:3 | 800x600 |
| Card Quadrado | 1:1 | 400x400 |
| Preview | 16:10 | 400x250 |
| Avatar | 1:1 | 100x100 |

---

## Direcionamentos para Insercao Correta

### Evitar Problemas Comuns

1. **Bordas Brancas:**
   - Sempre usar `object-fit: cover`
   - Certificar que imagem e maior que container
   - Verificar se nao ha padding/margin indesejado

2. **Desalinhamento:**
   - Usar `object-position: center` como padrao
   - Para imagens com foco especifico, ajustar para `top`, `bottom`, etc.

3. **Quebras de Layout:**
   - Definir dimensoes minimas no container
   - Usar aspect-ratio CSS quando possivel
   - Testar em multiplos tamanhos de tela

### Exemplo de Insercao CSS

```css
.card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

.hero__background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%; /* Foco no topo da imagem */
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}
```

### Fallbacks

Todas as imagens devem ter fallback de cor:

```html
<img src="image.jpg"
     alt="Descricao"
     onerror="this.style.background='var(--color-primary)'">
```

---

## Recursos para Busca de Imagens

### Bancos de Imagens Gratuitos
- **Unsplash:** unsplash.com (buscar: camping, forest, mountain, tent)
- **Pexels:** pexels.com
- **Pixabay:** pixabay.com

### Termos de Busca Sugeridos
- "camping tent forest"
- "mountain landscape green"
- "lake reflection nature"
- "hiking trail woods"
- "campfire night"
- "alpine meadow"
- "outdoor adventure"

### Bancos de Icones
- **Lucide:** lucide.dev (ja integrado no projeto)
- **Heroicons:** heroicons.com
- **Feather:** feathericons.com

---

## Checklist de Imagens Prioritarias

- [ ] `hero-forest.jpg` - Hero principal
- [ ] `campsite-preview.jpg` - Preview tour virtual
- [ ] `lake-camp.webp` - Card destino lago
- [ ] `forest-trail.webp` - Card trilha floresta
- [ ] `mountain-view.webp` - Card montanha
- [ ] `camp-illustration.svg` - Ilustracao acampamento
- [ ] `tent-icon.svg` - Icone barraca
- [ ] `map-marker.svg` - Marcador de mapa

---

*Documento criado em Janeiro 2026 para o projeto Camping Adventure*
