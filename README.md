# Portal Cotação do Ouro em Tempo Real

Portal web para acompanhamento em tempo real do preço do ouro, cotação do dólar e conversão para R$/grama.

**Acesse:** [ouro-portal.vercel.app](https://ouro-portal.vercel.app)

## Funcionalidades

- **Cotação do Ouro (USD/oz troy)** — preço em tempo real dos futuros de ouro (GC=F) via Yahoo Finance
- **Cotação do Dólar (BRL/USD)** — câmbio atualizado (BRL=X) via Yahoo Finance
- **Preço do Ouro em R$/grama** — conversão automática usando fator 1 oz troy = 31,1034768 g
- **Variação do dia (%)** — seta verde/vermelha com percentual vs fechamento anterior
- **Máxima e mínima do dia** — valores de high/low do pregão
- **Sparkline 7 dias** — mini gráfico SVG nos cards de ouro e dólar
- **Calculadora** — insira gramas e veja o valor em R$, com opção de spread (%)
- **Gráfico histórico 30 dias** — Chart.js com preço do ouro em R$/g
- **Tabela de preços por peso** — 1g, 5g, 10g, 25g, 1oz, 50g, 100g
- **Tema claro/escuro** — toggle no canto superior direito, salva preferência em localStorage
- **Atualização automática** — dados atualizados a cada 60 segundos

## Arquitetura

```
ouro-portal/
├── index.html          # Frontend (HTML/CSS/JS)
├── api/
│   └── quotes.js       # Serverless proxy para Yahoo Finance
├── logo-claro.png      # Logo GROFER (tema escuro)
├── logo-escuro.png     # Logo GROFER (tema claro)
└── README.md
```

### API Proxy (`/api/quotes`)

Função serverless na Vercel que faz proxy das requisições para a Yahoo Finance API, contornando restrições de CORS.

**Endpoints:**
- `GET /api/quotes?type=latest` — cotações em tempo real (preço, fechamento anterior, máx/mín)
- `GET /api/quotes?type=history` — histórico de 30 dias (timestamps + closes)

**Tickers Yahoo Finance:**
- `GC=F` — Gold Futures (COMEX)
- `BRL=X` — USD/BRL

## Fonte dos Dados

Todos os dados são obtidos da [Yahoo Finance](https://finance.yahoo.com) via API pública.

## Tecnologias

- HTML5 / CSS3 / JavaScript (vanilla)
- [Chart.js](https://www.chartjs.org/) — gráfico histórico
- [Vercel](https://vercel.com/) — hospedagem + serverless functions

## Deploy

Hospedado na Vercel. Para fazer deploy:

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Desenvolvido por

**GROFER** — [groferapp.com](https://groferapp.com)
