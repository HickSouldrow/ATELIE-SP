# AteliêSP — Server (Node.js + TypeScript, stub)

Estrutura pronta para a API que vai autenticar o app com **JWT em cookie
httpOnly**. As rotas existem mas ainda não têm lógica implementada de
propósito — isso fica pra próxima etapa, como pedido.

```
src/
  index.ts                    # bootstrap do Express, CORS com credentials, cookie-parser
  config/env.ts                # variáveis de ambiente (.env)
  routes/auth.routes.ts        # POST /register, /login, /logout, GET /me
  controllers/auth.controller.ts  # handlers (todos retornam 501 por enquanto)
  middlewares/auth.middleware.ts  # verificação do JWT no cookie (a implementar)
  types/auth.ts                # tipos compartilhados
```

## Rodando

```bash
cd server
cp .env.example .env
npm install
npm run dev     # http://localhost:3333/health
```

## Próxima etapa

Em `src/controllers/auth.controller.ts` e `src/middlewares/auth.middleware.ts`
tem comentários `TODO` explicando exatamente o que implementar: gerar o JWT
com `jsonwebtoken`, setar/ler o cookie httpOnly e validar nas rotas
protegidas. As rotas já batem com o que o app espera em
`mobile/src/integration/authIntegration.ts`.
