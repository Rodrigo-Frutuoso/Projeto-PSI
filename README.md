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
│   │   ├── Album.js                   # Modelo de álbum (US6, US9)
│   │   ├── CollectionItem.js          # Modelo de item da coleção (US10, US11)
│   │   ├── Song.js                    # Modelo de canção (US9)
│   │   ├── VersionRequest.js          # Modelo de pedido de nova versão (US12, US13, US14)
│   │   └── Notification.js            # Modelo de notificações (US14)
│   ├── routes/
│   │   ├── auth.js                    # Registo + login (US1, US2)
│   │   ├── users.js                   # Gerir/Ver perfil + Favoritos (US3, US4, US7)
│   │   ├── artists.js                 # Pesquisa + Pág. de artista (US5, US6)
│   │   ├── albums.js                  # Álbuns e versões (US8, US9, US12)
│   │   ├── collection.js              # Coleção de utilizador (US10, US11)
│   │   ├── notifications.js           # Notificações e limpeza (US14)
│   │   ├── versionRequests.js         # Gestão de pedidos e simulação (US13, US14)
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
│   │   │   │   ├── auth.service.ts    # Comunicação de autenticação/perfil com a API (US1, US2)
│   │   │   │   ├── artist.service.ts  # Pesquisa/artistas/discografia/favoritos (US5, US6, US7)
│   │   │   │   ├── album.service.ts   # Detalhes de álbum e versões (US8, US9, US12)
│   │   │   │   ├── collection.service.ts # Coleção de utilizador (US10, US11)
│   │   │   │   ├── search-state.service.ts # Estado global de pesquisa (US5, US8)
│   │   │   │   └── notification.service.ts # Sistema de notificações e polling (US14)
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts      # Protege rotas autenticadas
│   │   │   │   └── guest.guard.ts     # Bloqueia páginas de auth após login
│   │   │   └── components/
│   │   │       ├── register/          # Criar conta (US1)
│   │   │       ├── login/             # Iniciar sessão (US2)
│   │   │       ├── dashboard/         # Dashboard inicial (US2, US13)
│   │   │       ├── profile/           # Perfil e favorito (US3, US7)
│   │   │       ├── edit-profile/      # Editar perfil (US4)
│   │   │       ├── search/            # Pesquisar artistas e álbuns (US5, US8)
│   │   │       ├── artist/            # Informação do artista (US6)
│   │   │       ├── artist-albums/     # Álbuns do artista (US6)
│   │   │       ├── album/             # Detalhes do álbum e versões (US9, US12)
│   │   │       ├── custom-lists/      # Listas personalizadas e detalhe (US15-US18)
│   │   │       │   ├── custom-lists.html
│   │   │       │   ├── custom-list-detail.html
│   │   │       └── collection/        # Coleção de utilizador (US10, US11)
│   └── public/
│       └── icons/
├── diagrama_bd.png
└── README.md
```

## Mapa de User Stories

| User Story | Descricao curta |
| --- | --- |
| US1 | 1. Criar conta |
| US2 | 2. Iniciar sessao |
| US3 | 3. Visualizar perfil |
| US4 | 4. Gerir perfil |
| US5 | 5. Pesquisar artistas |
| US6 | 6. Pagina de artista |
| US7 | 7. Adicionar artista favorito |
| US8 | 8. Pesquisar álbuns |
| US9 | 9. Visualizar página de álbum |
| US10 | 10. Adicionar versão à coleção |
| US11 | 11. Visualizar coleção |
| US12 | 12. Submeter pedido de nova versão |
| US13 | 13. Ver estado dos pedidos |
| US14 | 14. Notificações e gestão de pedidos |
| US15 | 15. Criar lista personalizada |
| US16 | 16. Visualizar e gerir listas personalizadas |
| US17 | 17. Adicionar álbum a lista personalizada |
| US18 | 18. Visualizar conteúdo da lista personalizada |
| US19 | 19. Dashboard e navegação resumida |

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

**Álbuns (`/api/albums`)**
- `GET /:id` (Detalhes do álbum)
- `GET /:id/versions` (Versões do álbum)
- `POST /:id/versions/request` (Solicitar nova versão)

**Coleção (`/api/collection`)**
- `GET /me` (Listar itens da coleção)
- `POST /me` (Adicionar à coleção)
- `DELETE /me/:id` (Remover da coleção)

**Notificações (`/api/notifications`)**
- `GET /` (Listar notificações)
- `PATCH /:id/read` (Marcar como lida)
- `DELETE /` (Limpar todas as notificações)

**Pedidos de Versão (`/api/version-requests`)**
- `GET /` (Listar os meus pedidos)
- `POST /:id/respond` (Simular aceitação/recusa - **Rota de Teste**) - Body: `{"status": "aceite"}` ou `"recusado"`

---
*Nota: A rota `/api/version-requests/:id/respond` permite simular a ação de um administrador (aceitar ou recusar um pedido) sem necessidade de token, facilitando os testes da US14 conforme o enunciado.*
