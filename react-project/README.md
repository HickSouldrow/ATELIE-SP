# AteliêSP — App (Expo + expo-router)

## Rodando o projeto

```bash
cd mobile
npm install
npm run start     # abre o Metro / Expo Dev Tools
npm run web        # roda no navegador (bom pra ver o layout lado a lado)
npm run android
npm run ios
```

## O que já está pronto

- **Login** (`src/app/(auth)/index.tsx`): formulário enxuto e estreito à
  direita (largura máxima de 300px, mas 100% da altura da tela), imagem do
  mural (`assets/login-background.png`) ocupando a maior parte da tela à
  esquerda (`AuthImagePanel`).
- **Cadastro** (`src/app/(auth)/register.tsx`): card central sólido
  (`BoxLogin`, sem blur) sobre a imagem do grafite
  (`assets/register-background.png`).
- Navegação entre as telas já funcional: "Não possuo uma conta" (no login)
  leva pro cadastro, "Já tenho conta" (no cadastro) leva de volta pro login.
- Componentes reutilizáveis: `Button`, `Input`, `AuthImagePanel`, `BoxLogin`.
  Botões e campos com cantos quase retos (`borderRadius: 6`), não pill.
- Paleta de cores em `src/constants/colors.ts` — vermelho carmim (`#9E1130`)
  como cor base da marca, fundo quase preto de base quente.
- Fundo ilustrado (`assets/login-background.png`): papel de molde de ateliê
  de costura (grade + contorno de peças + piques + fio de trama), no lugar de
  um gradiente genérico — dá pra trocar por uma foto/arte real do AteliêSP
  depois.
- Tipografia: **Fraunces** (serifada) carregada via `@expo-google-fonts/fraunces`
  e usada só no wordmark "AteliêSP" (ver `src/constants/typography.ts`); o
  resto da interface fica na fonte de sistema.
- Contexto de autenticação (`AuthContext`) + camada de integração
  (`src/integration/authIntegration.ts`) já preparada para **JWT via cookie
  httpOnly** (`credentials: 'include'` em todas as chamadas).
- Enquanto não há API real, um **mock em memória**
  (`src/integration/authMock.ts` + `mocks/authMock.json`) responde no lugar do
  backend, então dá pra testar login/cadastro sem servidor:
  - usuário: `ateliesp`
  - senha: `123456`

## Próxima etapa (ligar a API real)

1. Preencha `API_URL` em `src/integration/authIntegration.ts` com a URL do
   backend (ex.: `http://localhost:3333/v1`, apontando pro `server/` deste
   projeto).
2. Em `src/integration/mocks/authMock.json`, mude `"enabled"` para `false`
   (ou simplesmente deixe `API_URL` preenchida — o mock só é usado quando
   `API_URL` está vazia OU `enabled: true`).
3. O backend deve responder com JWT em **cookie httpOnly** (`Set-Cookie`) nas
   rotas de login/registro — o app não guarda token manualmente em lugar
   nenhum, só confia no cookie.

## Trocar as imagens placeholder

As imagens em `assets/` (`login-background.png`, `icone-login.png`, `icon.png`,
etc.) são placeholders gerados só pra dar uma cara ao projeto. Troque pelos
assets reais do AteliêSP mantendo os mesmos nomes de arquivo (ou ajuste os
`require(...)` em `AuthImagePanel`, `BoxLogin` e nas telas).

## Estrutura por plataforma

Componentes e telas com comportamento diferente em web e Android ficam em uma
pasta com o seguinte formato:

```
components/button/
├── index.ts            barril: escolhe a implementação via Platform.select
├── index.web.tsx       implementação web
├── index.android.tsx   implementação Android (também usada no iOS)
├── styles.web.ts
├── styles.android.ts
└── types.ts            props compartilhadas pelas duas versões
```

As telas seguem o mesmo padrão em `src/screens`, e a regra de negócio
(estado, chamadas de API, navegação) fica em um hook compartilhado
(`useLogin`, `useRegister`) para não duplicar lógica entre as plataformas.
Os arquivos em `src/app` são apenas rotas do expo-router e só reexportam a tela.
