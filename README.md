# AteliêSP

Já pensou em se aventurar por aí, registrando as belezas da nossa paisagem urbana (he he, sei que prédios apagados não costuma ser tão belo, mas estamos aqui para algo mais especial!). O AteliêSP é o aplicativo perfeito para os paulistas amantes de obras públicas.

#

O projeto é feito com React-Native e foi separado da seguinte forma:

- **`android`** — app em React Native (Expo + expo-router) + TypeScript.
  Contém a tela de **Login** e **Cadastro** já funcionando com um mock local.
  - por enquanto, usar "ateliesp" e "123456" para logar.
- **`web`** — Versão mais apresentativa das funcionalidades do app.

- **server/** — API em Node.js + TypeScript (Express), estrutura pronta
  para autenticação **JWT em cookie httpOnly**, com as rotas criadas mas
  sem lógica ainda (fica pra próxima etapa).
