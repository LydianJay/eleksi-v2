# eleksi-v2

PIEP Console — an energy monitoring and administration dashboard for tracking real-time electrical measurements.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Laravel 13 (PHP 8.3+) |
| Frontend | React 19 + React Router 7 |
| Build | Vite 8 + Tailwind CSS 4 |
| Charts | ApexCharts |
| Auth | Laravel Sanctum (session-based) |
| Testing | Pest PHP |

## Architecture

This is a hybrid Laravel + React application. The backend serves both the API and the Blade entry point that mounts the React SPA via Vite.

```
┌─────────────────┐     ┌──────────────────────┐
│   Laravel 13    │     │     React 19 SPA     │
│                 │     │                      │
│  - Auth (Web)   │◄────│  - React Router 7    │
│  - REST API     │     │  - Tailwind CSS 4    │
│  - Eloquent     │     │  - ApexCharts        │
│  - Sanctum      │     │  - Axios             │
└─────────────────┘     └──────────────────────┘
```

## Features

- **Authentication** — Session-based login with Laravel Sanctum
- **Energy Dashboard** — Real-time area charts for Voltage (V), Current (A), Power (W), and Energy (kWh)
- **Stat Cards** — Latest readings displayed as summary cards
- **Records CRUD** — Full API resource for managing measurement records
- **Role-Based Navigation** — Configurable sidebar menu with role filtering (menuConfig.js)
- **Responsive Design** — Mobile-friendly sidebar and layout with Tailwind CSS

## Getting Started

### Prerequisites

- PHP 8.3+
- Composer
- Node.js 18+
- MySQL / PostgreSQL / SQLite

### Installation

```bash
# Install PHP dependencies
composer install

# Install JS dependencies
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Run migrations and seed demo data
php artisan migrate --force
php artisan db:seed

# Build frontend assets
npm run build
```

### Development

```bash
# Start the full dev stack (server, queue, logs, Vite)
composer dev
```

Or run services individually:

```bash
php artisan serve
npm run dev
```

### Seeded Demo Account

| Email | Password |
|-------|----------|
| admin@email.com | @default123 |

## Available Scripts

```bash
composer setup      # Full project setup (install, migrate, build)
composer dev        # Start all dev services concurrently
composer test       # Run Pest test suite
npm run dev         # Start Vite dev server
npm run build       # Build production assets
```

## Project Structure

```
app/
├── Http/Controllers/
│   ├── AuthController.php      # Login endpoint
│   └── RecordsController.php   # Records CRUD
├── Models/
│   ├── User.php                # Authenticatable user model
│   └── Records.php             # Energy measurement model
└── Services/
    ├── AuthService.php         # Authentication logic
    └── RecordsService.php      # Records business logic

database/
├── migrations/
│   └── ..._create_records_table.php
└── seeders/
    ├── DatabaseSeeder.php      # Seeds default admin user
    └── DataSeeder.php          # Seeds 100 fake records

resources/
├── js/react/
│   ├── main.jsx                # React entry point + routing
│   ├── views/
│   │   ├── LoginPage.jsx       # Login form
│   │   └── DashboardView.jsx   # Energy dashboard with charts
│   ├── components/
│   │   ├── Dashboard.jsx       # Layout shell (sidebar + navbar)
│   │   └── PanelComponent.jsx  # Sidebar menu item
│   ├── config/
│   │   └── menuConfig.js       # Navigation & role configuration
│   └── services/
│       └── api.js              # Axios instance with CSRF interceptor
└── views/
    └── view.blade.php          # Blade shell mounting React

routes/
├── web.php                     # Web routes (login, auth-protected views)
└── api.php                     # API routes (external record ingestion)
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/login` | — | Render login page |
| POST | `/login` | — | Authenticate user |
| GET | `/api/records` | Session | Paginate today's records |
| POST | `/api/records` | Session | Create new record |
| GET | `/view/records` | Session | Render dashboard view |

## Data Model

**records** table:

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| voltage | float | Voltage in Volts (V) |
| current | float | Current in Amperes (A) |
| power | float | Power in Watts (W) |
| energy | float | Energy in Kilowatt-hours (kWh) |
| created_at | timestamp | Record creation time |
| updated_at | timestamp | Record update time |

## License

MIT
