# DineQR — Digital Menus by Pepsi

Pepsi-branded restaurant digital menu platform. Restaurants get a branded digital menu with a QR code that customers can scan to view the menu.

## Apps

| App | Description | Dev Port |
|-----|-------------|----------|
| `apps/menu` | Customer-facing menu (React Router v7 SSR) | 3000 |
| `apps/api` | REST API (Express 5 + Sequelize + PostgreSQL) | 4000 |
| `apps/admin` | Admin dashboard SPA (React Router v7 SPA + Ant Design) | 3001 |
| `packages/shared` | Shared TypeScript types & constants | -- |

## Prerequisites

- Node.js >= 22
- pnpm >= 9
- Docker & Docker Compose

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Copy env vars
cp .env.example .env
# Edit .env if needed (e.g., DB_PORT if 5432 is taken)

# 3. Start database
docker compose up db -d

# 4. Run migrations and seed data
pnpm db:init

# 5. Start all apps
pnpm dev
```

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@dineqr.com | Admin@dineqr2026 |
| Restaurant Admin (The Golden Fork) | manager@goldenfork.com | Manager@2026 |
| Restaurant Admin (Burger Junction) | manager@burgerjunction.com | Manager@2026 |
| Restaurant Admin (Levant Kitchen) | manager@levantkitchen.com | Manager@2026 |

## Sample Menu URLs

- http://localhost:3000/the-golden-fork
- http://localhost:3000/burger-junction
- http://localhost:3000/levant-kitchen

## Database

```bash
pnpm db:migrate          # Run all pending migrations
pnpm db:migrate:undo     # Undo last migration
pnpm db:seed             # Seed demo data (idempotent)
pnpm db:seed:undo        # Undo all seeders
pnpm db:init             # Migrate + seed in one command
```

### Schema (4 tables)

| Table | Description |
|-------|-------------|
| `users` | Admin users with role-based access (super_admin / restaurant_admin) |
| `restaurants` | Restaurant profiles with slug, logo, working hours |
| `menu_sections` | Menu categories per restaurant (ordered) |
| `menu_items` | Individual items with price, image, tags, featured flag |

## API Endpoints

### Admin (Bearer token required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/auth/login` | Login |
| POST | `/api/admin/auth/refresh` | Refresh token |
| GET | `/api/admin/auth/me` | Current user |
| GET | `/api/admin/dashboard/stats` | Dashboard KPIs |
| CRUD | `/api/admin/restaurants` | Restaurant management |
| GET | `/api/admin/restaurants/:id/qr-code` | Generate QR code (PNG/SVG) |
| CRUD | `/api/admin/menu-sections` | Menu sections |
| CRUD | `/api/admin/menu-items` | Menu items |
| CRUD | `/api/admin/users` | User management |

### Public (No auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/public/restaurants` | List active restaurants |
| GET | `/api/public/restaurants/:slug` | Restaurant details |
| GET | `/api/public/restaurants/:slug/menu` | Full menu with sections & items |

## Role-Based Access

- **Super Admin** (Pepsi team): Full access to all restaurants, users, and menus
- **Restaurant Admin**: Can only manage their own restaurant's menu sections and items

## Tech Stack

- **Monorepo**: pnpm workspaces
- **API**: Express 5 + Sequelize ORM + PostgreSQL
- **Admin**: React Router v7 SPA + Ant Design + Tailwind CSS
- **Menu**: React Router v7 SSR + Tailwind CSS
- **Auth**: JWT access tokens + httpOnly refresh cookies
- **QR Codes**: `qrcode` package with Pepsi blue branding
- **Docker**: PostgreSQL via Docker Compose
