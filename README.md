# Metrodle SP

Daily station-guessing game for São Paulo Metro (with train mode). The docs are in Portuguese.

Jogo diário de adivinhação de estação do Metrô de São Paulo (com modo CPTM).
Site: https://metrodle.com.br/

## Desenvolvimento

Pré-requisito: Node.js 18+.

```bash
npm install
npm run dev
```

O Vite sobe a aplicação em `http://localhost:5173`.

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento (Vite) |
| `npm run build` | Gera o build de produção em `build/` |
| `npm run preview` | Serve localmente o build de produção |
| `npm run test` | Executa `tsc` e Vitest (`src/__tests__/*.test.ts`) |
| `npm run typecheck` | Executa `tsc` |
| `npm run format` | Formata com Prettier |
| `npm run compress:lines` | Regenera `src/map/lines.geojson` a partir de `src/map/original_lines.geojson` |

## Ambiente

Não é necessária chave de API para desenvolvimento local (`.env.example` é propositalmente vazio).

## Dados e arquivos de mapa

- Dados do modo Metrô: `src/stations.csv`, `src/adjacencies.csv`, `src/interchanges.csv`
- Dados do modo CPTM: `src/data/*_with_cptm.csv`
- Definição de linhas: `src/lines.ts`
- Mapa embarcado e geometria de linhas: `src/map/`

Para o fluxo de geração/compressão das linhas do mapa, veja `src/map/README.md`.

## Observações

- `npm test` e `npm run typecheck` executam `tsc`, que atualiza `dist/`.
- Veja `CONTRIBUTING.md` para diretrizes de contribuição.
