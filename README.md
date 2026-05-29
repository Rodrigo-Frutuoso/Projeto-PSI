# 🎵 PSI Project 2025/2026 - Group 01

Web application for managing collections of physical music albums.

**Stack:** MEAN (MongoDB, Express, Angular, Node.js)

## Requirements

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) running locally (port 27017)

## Installation

```bash
# Backend
cd backend
cp .env.example .env
npm install

# Frontend
cd frontend
npm install
```

## Running (Development)

The proxy is configured so the frontend forwards requests from `/api/*` to `http://localhost:3000`.

### Desktop

```bash
# Terminal 1 — Backend (port 3000)
cd backend
npm run dev

# Terminal 2 — Frontend (port 4200)
cd frontend
npm start
```

Open: `http://localhost:4200`

### Mobile

1. Connect your PC and mobile device to the same Wi-Fi network.

```bash
# Terminal 1 — Backend (port 3000)
cd backend
npm run dev

# Terminal 2 — Frontend (port 4200, exposed to the network)
cd frontend
npm start -- --host 0.0.0.0 --port 4200
```

2. In the frontend terminal you will see the network links. Open the first Network link on your mobile device.

For example: `http://192.168.1.78:4200`

(The IP may vary — use the address shown in your terminal.)

## Project Structure

```
Projeto-PSI/
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── server.js                      # Express startup and route registration
│   ├── middleware/
│   │   └── auth.js                    # JWT validation
│   ├── models/
│   │   ├── User.js                    # User model (US1-US4, US7)
│   │   ├── Artist.js                  # Artist model (US5-US7)
│   │   ├── Album.js                   # Album model (US6, US9)
│   │   ├── CollectionItem.js          # Collection item model (US10, US11)
│   │   ├── Song.js                    # Song model (US9)
│   │   ├── VersionRequest.js          # Version request model (US12, US13, US14)
│   │   └── Notification.js            # Notification model (US14)
│   ├── routes/
│   │   ├── auth.js                    # Register + login (US1, US2)
│   │   ├── users.js                   # Manage/View profile + Favorites (US3, US4, US7)
│   │   ├── artists.js                 # Search + Artist page (US5, US6)
│   │   ├── albums.js                  # Albums and versions (US8, US9, US12)
│   │   ├── collection.js              # User collection (US10, US11)
│   │   ├── notifications.js           # Notifications and cleanup (US14)
│   │   ├── versionRequests.js         # Request management and simulation (US13, US14)
│   │   └── init.js                    # Test initializations
│   └── services/
│       └── seedData.js                # Seed data for development/testing
├── frontend/
│   ├── angular.json
│   ├── package.json
│   ├── src/
│   │   ├── main.ts
│   │   ├── styles.css
│   │   ├── index.html
│   │   ├── proxy.conf.json            # Proxy /api -> backend
│   │   ├── app/
│   │   │   ├── app.ts                 # Root component + navbar + global search
│   │   │   ├── app.html
│   │   │   ├── app.css
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.ts          # Navigation and component mapping
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts    # Authentication/profile API communication (US1, US2)
│   │   │   │   ├── artist.service.ts  # Search/artists/discography/favorites (US5, US6, US7)
│   │   │   │   ├── album.service.ts   # Album details and versions (US8, US9, US12)
│   │   │   │   ├── collection.service.ts # User collection (US10, US11)
│   │   │   │   ├── search-state.service.ts # Global search state (US5, US8)
│   │   │   │   └── notification.service.ts # Notification system and polling (US14)
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts      # Protects authenticated routes
│   │   │   │   └── guest.guard.ts     # Blocks auth pages after login
│   │   │   └── components/
│   │   │       ├── register/          # Create account (US1)
│   │   │       ├── login/             # Sign in (US2)
│   │   │       ├── dashboard/         # Initial dashboard (US2, US13)
│   │   │       ├── profile/           # Profile and favorite (US3, US7)
│   │   │       ├── edit-profile/      # Edit profile (US4)
│   │   │       ├── search/            # Search artists and albums (US5, US8)
│   │   │       ├── artist/            # Artist information (US6)
│   │   │       ├── artist-albums/     # Artist's albums (US6)
│   │   │       ├── album/             # Album details and versions (US9, US12)
│   │   │       ├── custom-lists/      # Custom lists and details (US15-US18)
│   │   │       │   ├── custom-lists.html
│   │   │       │   ├── custom-list-detail.html
│   │   │       └── collection/        # User collection (US10, US11)
│   └── public/
│       └── icons/
├── diagrama_bd.png
└── README.md
```

## User Stories Map

| User Story | Short description |
| --- | --- |
| US1 | 1. Create account |
| US2 | 2. Sign in |
| US3 | 3. View profile |
| US4 | 4. Manage profile |
| US5 | 5. Search artists |
| US6 | 6. Artist page |
| US7 | 7. Add favorite artist |
| US8 | 8. Search albums |
| US9 | 9. View album page |
| US10 | 10. Add version to collection |
| US11 | 11. View collection |
| US12 | 12. Submit new version request |
| US13 | 13. View request status |
| US14 | 14. Notifications and request management |
| US15 | 15. Create custom list |
| US16 | 16. View and manage custom lists |
| US17 | 17. Add album to custom list |
| US18 | 18. View custom list contents |
| US19 | 19. Dashboard and quick navigation |

## API Endpoints

**Authentication (`/api/auth`)**
- `POST /register`
- `POST /login`

**Users (`/api/users`)**
- `GET /me` (View profile)
- `PUT /me` (Update profile)
- `POST /me/favorites` (Add favorite)
- `DELETE /me/favorites/:artistId` (Remove favorite)
- `GET /me/favorites` (List favorites)

**Artists (`/api/artists`)**
- `GET /search?q=` (Search artists)
- `GET /:id` (Artist details)
- `GET /:id/albums` (Artist albums)

**Albums (`/api/albums`)**
- `GET /:id` (Album details)
- `GET /:id/versions` (Album versions)
- `POST /:id/versions/request` (Request new version)

**Collection (`/api/collection`)**
- `GET /me` (List collection items)
- `POST /me` (Add to collection)
- `DELETE /me/:id` (Remove from collection)

**Notifications (`/api/notifications`)**
- `GET /` (List notifications)
- `PATCH /:id/read` (Mark as read)
- `DELETE /` (Clear all notifications)

**Version Requests (`/api/version-requests`)**
- `GET /` (List my requests)
- `POST /:id/respond` (Simulate accept/reject - **Test Route**) - Body: `{"status": "accepted"}` or `"rejected"`

---
*Note: The route `/api/version-requests/:id/respond` allows simulating an admin action (accepting or rejecting a request) without a token, which simplifies testing US14 as described in the assignment.*
