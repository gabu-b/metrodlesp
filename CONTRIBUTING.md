# Contribuindo com o Metrodle SP

Obrigado por contribuir.

## Início rápido

1. Instale Node.js 18+.
2. Instale as dependências: `npm install`.
3. Inicie o ambiente local: `npm run dev`.

## Comandos

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento (Vite) |
| `npm run build` | Gera os assets de produção em `build/` |
| `npm run preview` | Pré-visualiza localmente o build de produção |
| `npm run test` | Executa `tsc` e Vitest |
| `npm run typecheck` | Executa `tsc` |
| `npm run format` | Formata com Prettier |

## Convenções de código

- Use TypeScript + ESM e mantenha imports locais em `src/` com sufixo `.js`.
- Sempre que possível, mantenha lógica pura em `src/logic.ts` e integração de DOM em `src/index.ts`.
- Mantenha IDs de estação como QIDs do Wikidata e IDs de linha alinhados com `src/lines.ts`.
- Use `new URL("./file", import.meta.url)` para carregar CSVs/assets locais.
- Preserve a lógica de reset diário no horário de São Paulo (UTC-3) em `src/index.ts`.

## Testes

- Rode `npm test` antes de abrir PR.
- Adicione/atualize testes em `src/__tests__/` quando houver mudança de comportamento.

## Alterações em dados e mapa

- Dados do Metrô: `src/stations.csv`, `src/adjacencies.csv`, `src/interchanges.csv`.
- Dados da CPTM: `src/data/*_with_cptm.csv`.
- Para o fluxo de geometria das linhas do mapa, siga `src/map/README.md`.

## Pull requests

- Mantenha PRs pequenos e focados.
- Descreva claramente o que mudou e por quê.
- Inclua screenshots/GIFs para mudanças de UI.
