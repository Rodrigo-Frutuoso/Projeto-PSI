# 🎵 PSI Projeto 2025/2026 - Grupo 01

Aplicação web para gestão de coleções de álbuns de música em formato físico.

**Stack:** MEAN (MongoDB, Express, Angular, Node.js)

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) a correr localmente (porta 27017)

## Instalação

```bash
# Backend
cd backend
cp .env.example .env
npm install

# Frontend
cd frontend
npm install
```

## Execução (Desenvolvimento)

O proxy está configurado para que o frontend reencaminhe pedidos `/api/*` para `http://localhost:3000`.

### Desktop

```bash
# Terminal 1 — Backend (porta 3000)
cd backend
npm run dev

# Terminal 2 — Frontend (porta 4200)
cd frontend
npm start
```

Abre: `http://localhost:4200`

### Telemóvel

1. Liga o PC e o telemóvel à mesma rede Wi-Fi.

```bash
# Terminal 1 — Backend (porta 3000)
cd backend
npm run dev

# Terminal 2 — Frontend (porta 4200, exposto na rede)
cd frontend
npm start -- --host 0.0.0.0 --port 4200
```

2. No terminal do frontend, vais ver os links da rede. Abre no telemóvel o primeiro link de Network.

Por exemplo:```http://192.168.1.78:4200```

(O IP pode ser diferente no teu caso — copia o que aparece no teu terminal)

## Estrutura do Projeto

```
Projeto-PSI/
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── server.js                      # Inicialização do Express e registo de rotas
│   ├── middleware/
│   │   └── auth.js                    # Validação de JWT
│   ├── models/
│   │   ├── User.js                    # Modelo de utilizador (US1-US4, US7)
│   │   ├── Artist.js                  # Modelo de artista (US5-US7)
│   │   └── Album.js                   # Modelo de álbum (US6)
│   ├── routes/
│   │   ├── auth.js                    # Registo + login (US1, US2)
│   │   ├── users.js                   # Gerir/Ver perfil + Favoritos (US3, US4, US7)
│   │   ├── artists.js                 # Pesquisa + Pág. de artista (US5, US6)
│   │   └── init.js                    # Inicializações para testes
│   └── services/
│       └── seedData.js                # Seed de dados para desenvolvimento/testes
├── frontend/
│   ├── angular.json
│   ├── package.json
│   ├── src/
│   │   ├── main.ts
│   │   ├── styles.css
│   │   ├── index.html
│   │   ├── proxy.conf.json            # Proxy /api -> backend
│   │   ├── app/
│   │   │   ├── app.ts                 # Componente raiz + navbar + pesquisa global
│   │   │   ├── app.html
│   │   │   ├── app.css
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.ts          # Navegação e associação de componentes
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts    # Comunicação de autenticação/perfil com a API
│   │   │   │   └── artist.service.ts  # Pesquisa/artistas/discografia/favoritos
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts      # Protege rotas autenticadas
│   │   │   │   └── guest.guard.ts     # Bloqueia páginas de auth após login
│   │   │   └── components/
│   │   │       ├── register/          # Criar conta (US1)
│   │   │       ├── login/             # Iniciar sessão (US2)
│   │   │       ├── dashboard/         # Dashboard inicial (US2)
│   │   │       ├── profile/           # Perfil e favorito (US3, US7)
│   │   │       ├── edit-profile/      # Editar perfil (US4)
│   │   │       ├── search/            # Pesquisar artistas (US5)
│   │   │       ├── artist/            # Informação do artista (US6)
│   │   │       └── artist-albums/     # Albuns do artista (US6)
│   └── public/
├── diagrama_bd.png
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
