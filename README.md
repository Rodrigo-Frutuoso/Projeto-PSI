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
│   │   ├── User.js                    # Modelo de utilizador (US1-US4, US7)
│   │   ├── Artist.js                  # Modelo de artista (US5-US7)
│   │   └── Album.js                   # Modelo de álbum (US6)
│   ├── routes/
│   │   ├── auth.js                    # Registo + login (US1, US2)
│   │   ├── users.js                   # Gerir/Ver perfil + Favoritos (US3, US4, US7)
│   │   ├── artists.js                 # Pesquisa + Pág. de artista (US5, US6)
│   │   └── init.js                    # Inicializações para testes
│   ├── server.js                      # Inicialização do express e rotas
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.routes.ts          # Navegação e associação de componentes
│   │   │   ├── services/
│   │   │   │   └── auth.service.ts    # Comunicação com a API
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts      # Protege rotas estritas
│   │   │   └── components/
│   │   │       ├── register/          # Criar conta (US1)
│   │   │       ├── login/             # Iniciar sessao (US2)
│   │   │       ├── dashboard/         # Dashboard inicial (US2)
│   │   │       ├── profile/           # Perfil e favorito (US3, US7)
│   │   │       ├── edit-profile/      # Editar perfil (US4)
│   │   │       ├── search/            # Pesquisar artistas (US5)
│   │   │       ├── artist/            # Informação do artista (US6)
│   │   │       └── artist-albums/     # Albuns do artista (US6)
│   │   └── proxy.conf.json            # Proxy /api -> backend
│   └── package.json
└── README.md
```

## Mapa de User Stories

| User Story | Descricao curta |
| --- | --- |
| US1 | Criar conta | 
| US2 | Iniciar sessao | 
| US3 | Visualizar perfil | 
| US4 | Gerir perfil | 
| US5 | Pesquisar artistas | 
| US6 | Pagina de artista | 
| US7 | Adicionar artista favorito | 

## Endpoints da API

**Autenticação (`/api/auth`)**
- `POST /register`
- `POST /login`

**Utilizadores (`/api/users`)**
- `GET /me` (Visualizar perfil)
- `PUT /me` (Atualizar perfil)
- `POST /me/favorites` (Adicionar favorito)
- `DELETE /me/favorites/:artistId` (Remover favorito)
- `GET /me/favorites` (Listar favoritos)

**Artistas (`/api/artists`)**
- `GET /search?q=` (Pesquisar artistas)
- `GET /:id` (Detalhes do artista)
- `GET /:id/albums` (Álbuns do artista)