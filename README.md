# 🎵 PSI Projeto 2025/2026 — Grupo 01

Aplicação web para gestão de coleções de álbuns de música em formato físico.

**Stack:** MEAN (MongoDB, Express, Angular, Node.js)

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) a correr localmente (porta 27017)

## Instalação

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## Execução (Desenvolvimento)

```bash
# Terminal 1 — Backend (porta 3000)
cd backend
npm run dev

# Terminal 2 — Frontend (porta 4200)
cd frontend
npm start
```

O proxy está configurado para que o frontend reencaminhe pedidos `/api/*` para `http://localhost:3000`.

## Estrutura do Projeto

```
Projeto-PSI/
├── backend/
│   ├── middleware/
│   ├── models/
│   │   └── User.js                    # Modelo de utilizador (US1, US2)
│   ├── routes/
│   │   └── auth.js                    # Registo + login (US1, US2)
│   ├── server.js                      # Registo de rotas /api/auth (US1, US2)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.routes.ts          # /register, /login, /dashboard (US1, US2)
│   │   │   ├── services/
│   │   │   │   └── auth.service.ts    # API auth + sessao localStorage (US1, US2)
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts      # Protege dashboard (US2)
│   │   │   └── components/
│   │   │       ├── register/
│   │   │       │   ├── register.ts
│   │   │       │   ├── register.html
│   │   │       │   └── register.css   # Criar conta (US1)
│   │   │       ├── login/
│   │   │       │   ├── login.ts
│   │   │       │   ├── login.html
│   │   │       │   └── login.css      # Iniciar sessao (US2)
│   │   │       └── dashboard/
│   │   │           ├── dashboard.ts
│   │   │           ├── dashboard.html
│   │   │           └── dashboard.css  # Dashboard apos login (US2)
│   │   └── proxy.conf.json            # Proxy /api -> backend
│   └── package.json
└── README.md
```

## Mapa de User Stories

| User Story | Descricao curta | Estado |
| --- | --- | --- |
| US1 | Criar conta | Implementado |
| US2 | Iniciar sessao | Implementado |
| US3 | Visualizar perfil | Pendente |
| US4 | Gerir perfil | Pendente |
| US5 | Pesquisar artistas | Pendente |
| US6 | Pagina de artista | Pendente |
| US7 | Adicionar artista favorito | Pendente |

## Endpoints de Autenticacao

- `POST /api/auth/register`
- `POST /api/auth/login`