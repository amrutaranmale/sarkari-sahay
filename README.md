# SarkariSahay — Government Scheme Finder for India

**SarkariSahay** helps citizens discover central and state government schemes they may be eligible for. Users enter their profile (state, age, income, category, gender, occupation, disability status) and instantly see matching schemes with plain-English summaries, benefit amounts, and official application links.

## Tech stack

| Layer    | Technology              |
|----------|-------------------------|
| Frontend | React, Vite, TailwindCSS |
| Backend  | Node.js, Express        |
| Database | SQLite (dev) / PostgreSQL (prod) |
| ORM      | Prisma                  |
| Auth     | None (anonymous MVP)    |

## Project structure

```
sarkari-sahay/
├── frontend/          # React SPA
├── backend/           # Express API + Prisma
└── README.md
```

## Prerequisites

- **Node.js** 18+
- **Database:** SQLite by default (no install needed). For production, use PostgreSQL (see below).

## Quick start

### 1. Backend

```bash
cd backend
cp .env.example .env

npm install
npm run db:generate
npm run db:setup    # push schema + seed schemes
npm run dev
```

**PostgreSQL (optional):** Change `provider` in `prisma/schema.prisma` to `postgresql`, set `DATABASE_URL` in `.env`, create database `sarkari_sahay`, then run `npm run db:setup`.

API runs at **http://localhost:3001**

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at **http://localhost:5173** (proxies `/api` to the backend).

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/schemes` | List schemes (`?category`, `?level`, `?state`, `?search`) |
| GET | `/api/schemes/:slug` | Scheme detail |
| GET | `/api/schemes/categories` | Distinct categories |
| POST | `/api/eligibility` | Check eligibility (JSON body) |
| GET | `/api/eligibility` | Check eligibility (query params) |

### Eligibility request body

```json
{
  "state": "maharashtra",
  "age": "22",
  "incomeRange": "below_1l",
  "caste": "sc",
  "gender": "female",
  "occupation": "student",
  "disability": "no"
}
```

## Eligibility engine

Core logic lives in `backend/src/engine/eligibilityEngine.js`. It matches schemes by:

- **State** — central schemes apply everywhere; state schemes match the selected state
- **Age** — min/max age on the scheme
- **Income** — overlapping income brackets
- **Caste, gender, occupation** — scheme arrays (or `all`)
- **Disability** — required when `disabilityRequired` is true

## Seeded schemes

The database includes **124 government schemes**:

- **61 central schemes** — PM-KISAN, PM-JAY, MGNREGA, MUDRA, PMKVY, NSP scholarships, pensions, housing, disability, and more
- **63 state schemes** — Programs across all 28 states (Maharashtra, UP, Tamil Nadu, Karnataka, West Bengal, etc.)

Data lives in `backend/src/seed/data/central.schemes.js` and `state.schemes.js`. Run `npm run db:seed` to refresh.

> **Note:** India has 1000+ active schemes nationwide. This app covers major flagship central and state programs. Always verify on official portals before applying.

## Environment variables

**Backend** (`backend/.env`):

```
DATABASE_URL="file:./dev.db"
PORT=3001
```

## Scripts

| Location | Command | Purpose |
|----------|---------|---------|
| backend | `npm run dev` | Start API with watch |
| backend | `npm run db:setup` | Migrate + seed |
| frontend | `npm run dev` | Start Vite dev server |
| frontend | `npm run build` | Production build |

## Disclaimer

SarkariSahay is for **informational purposes only**. Eligibility rules on official portals may differ. Always confirm requirements and apply only through government websites linked in each scheme card.

## License

MIT
