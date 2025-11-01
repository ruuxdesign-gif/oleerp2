# Olé ERP — Soluções de Provedores

Plataforma completa de gestão para provedores de internet (ISP). Organize clientes, faturamento, suporte, operações e relatórios em um único lugar.

## Recursos
- Dashboard com indicadores operacionais
- Gestão de clientes e contratos
- Financeiro e faturamento
- Suporte e abertura de chamados
- Relatórios e métricas
- Controle de acesso e permissões
- Integrações (extensível)

## Como rodar localmente
Pré‑requisitos: Node.js LTS e npm instalados.

```sh
# Instalar dependências
npm i

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Visualizar o build localmente
npm run preview
```

## Estrutura e Branding
- Favicon/Logo: `public/ole-erp-logo.svg`
- Metadados (título, descrição e imagens de compartilhamento): `index.html`
- Configuração Vite/React/TypeScript: `vite.config.ts`, `tsconfig*.json`

## Deploy (Vercel)
- Root Directory: `oleerp`
- Build Command: `npm run build`
- Output Directory: `dist`

Ao fazer push para a branch principal, a Vercel realiza o deploy automaticamente.

## Suporte
Para dúvidas e melhorias, abra uma issue no repositório ou entre em contato com a equipe Olé ERP.
