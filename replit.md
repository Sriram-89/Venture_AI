# IdeaValidator.in

## Overview

IdeaValidator.in is an AI-powered startup idea validation tool built for Indian entrepreneurs. Users submit a business idea description, and the app uses OpenAI (via Replit AI Integrations) to analyze it, returning structured feedback including market competition assessment, target audience analysis, success rate score, unique differentiators, relevant Indian government schemes, and a phased launch roadmap. Results are persisted in a PostgreSQL database and viewable via a dedicated results page.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure
The project follows a three-directory monorepo pattern:
- **`client/`** — React frontend (SPA)
- **`server/`** — Express backend (API server)
- **`shared/`** — Code shared between client and server (schemas, route definitions, types)

### Frontend (`client/`)
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight client-side router) with two main routes: Home (`/`) and Result (`/result/:id`)
- **State Management**: TanStack React Query for server state (fetching and caching API responses)
- **Forms**: React Hook Form with Zod resolver for validation
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style). Custom Indian flag-inspired color theme (saffron, white, green, navy). Uses CSS variables for theming.
- **Animations**: Framer Motion for page transitions and visual effects
- **Fonts**: Outfit (display) and DM Sans (body)
- **Build Tool**: Vite with React plugin
- **UI Components**: Full shadcn/ui component library installed in `client/src/components/ui/`

### Backend (`server/`)
- **Framework**: Express 5 running on Node.js with TypeScript (via tsx)
- **API Design**: REST API with typed route contracts defined in `shared/routes.ts`. Routes use Zod schemas for input validation and response typing.
- **AI Integration**: OpenAI SDK configured with Replit AI Integrations environment variables (`AI_INTEGRATIONS_OPENAI_API_KEY`, `AI_INTEGRATIONS_OPENAI_BASE_URL`). The main endpoint sends a structured prompt and expects JSON back with analysis fields.
- **Dev Server**: Vite dev server middleware is used in development for HMR; in production, static files are served from `dist/public/`
- **Build**: Custom build script (`script/build.ts`) uses esbuild for server bundling and Vite for client bundling. Output goes to `dist/`.

### API Endpoints
- `POST /api/ideas/analyze` — Accepts `{ description: string }`, sends to OpenAI for analysis, stores result in DB, returns the full idea record
- `GET /api/ideas/:id` — Retrieves a previously analyzed idea by ID

### Database
- **Database**: PostgreSQL (required, connection via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-Zod integration
- **Schema** (in `shared/schema.ts`):
  - `ideas` table: `id` (serial PK), `description` (text), `analysis` (jsonb — stores the structured AI response)
- **Additional tables** (in `shared/models/chat.ts`, for Replit integrations): `conversations` and `messages` tables for chat functionality
- **Migrations**: Managed via `drizzle-kit push` (schema push approach, no migration files checked in)

### Shared Layer (`shared/`)
- `schema.ts` — Drizzle table definitions and Zod insert schemas
- `routes.ts` — Typed API route contracts (paths, methods, input/output schemas) used by both client and server
- `models/chat.ts` — Additional Drizzle schemas for conversation/message features

### Replit Integrations
The `server/replit_integrations/` and `client/replit_integrations/` directories contain pre-built modules for:
- **Chat**: Conversation and message CRUD with OpenAI streaming
- **Audio**: Voice recording, playback, speech-to-text, text-to-speech
- **Image**: Image generation via gpt-image-1
- **Batch**: Batch processing with rate limiting and retries

These are utility modules that may or may not be actively used but are available for extension.

## External Dependencies

### Required Services
- **PostgreSQL Database**: Connected via `DATABASE_URL` environment variable. Used for persisting ideas and analysis results. Must be provisioned before the app can start.
- **OpenAI API (via Replit AI Integrations)**: Connected via `AI_INTEGRATIONS_OPENAI_API_KEY` and `AI_INTEGRATIONS_OPENAI_BASE_URL` environment variables. Powers the core idea analysis feature.

### Key NPM Packages
- **Runtime**: express, drizzle-orm, pg, openai, zod, wouter, @tanstack/react-query, react-hook-form, framer-motion
- **UI**: Full shadcn/ui stack (Radix UI primitives, class-variance-authority, tailwind-merge, clsx, lucide-react, recharts, embla-carousel, vaul, cmdk, react-day-picker, input-otp, react-resizable-panels)
- **Build**: vite, esbuild, tsx, typescript, tailwindcss, autoprefixer, drizzle-kit

### Scripts
- `npm run dev` — Start development server with HMR
- `npm run build` — Build client and server for production
- `npm start` — Run production build
- `npm run db:push` — Push Drizzle schema to PostgreSQL
- `npm run check` — TypeScript type checking