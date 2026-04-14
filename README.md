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
│   ├── middleware/   # Middleware (ex: autenticação JWT)
│   ├── models/       # Mongoose schemas
│   ├── routes/       # Express routes
│   ├── server.js     # Entry point
│   └── .env          # Variáveis de ambiente
├── frontend/         # Angular app
│   └── src/
│       └── app/      # Componentes, serviços, etc.
├── enunciado.txt
├── slides.txt
└── README.md
```
