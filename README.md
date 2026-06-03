# SmartRep AI Gym Planner

An AI-powered workout plan generator that creates personalized training programs tailored to your fitness goals, experience level, schedule, and available equipment.

Built with React, Express, and Neon (PostgreSQL + Auth), using OpenRouter to generate structured weekly training plans via LLM.

---

## Tech Stack

### Frontend
- **React 19** + **TypeScript** — UI framework with type safety
- **Vite 8** — Build tool and dev server
- **React Router DOM 7** — Client-side routing
- **Tailwind CSS 4** — Utility-first styling (dark theme)
- **lucide-react** — Icons
- **@neondatabase/neon-js** — Neon Auth (authentication)

### Backend
- **Express 5** — HTTP server
- **TypeScript** + **tsx** — Type-safe runtime
- **Prisma 7** — ORM for PostgreSQL
- **OpenAI SDK** — OpenRouter integration for AI plan generation
- **cookie-parser**, **cors**, **dotenv**

### Database & Auth
- **Neon PostgreSQL** — Serverless database
- **Neon Auth** — Built-in passwordless authentication

### Infrastructure
- **OpenRouter** — LLM API gateway (default model: `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free`)

---

## Architecture

```
┌──────────────────────────────────────────────────┐
│                    Frontend                      │
│              (React + Vite + TS)                 │
│                                                  │
│  ┌──────────┐  ┌───────────┐  ┌───────────────┐  │
│  │  Pages   │  │Components │  │  AuthContext  │  │
│  │ Home     │  │ Navbar    │  │  (user state, │  │
│  │ Auth     │  │ Button    │  │   plan data,  │  │
│  │Onboarding│  │ Card      │  │   generation) │  │
│  │ Profile  │  │ Select    │  │               │  │
│  │ Account  │  │ DayCard   │  └───────┬───────┘  │
│  └──────────┘  │PlanDisplay│          │          │
│       │        └───────────┘          │          │
│       └──────────────┬────────────────┘          │
│                      │ fetch /api/*              │
└──────────────────────┼───────────────────────────┘
                       │
              HTTP (localhost:3001)
                       │
┌──────────────────────┼──────────────────────────┐
│              Backend (Express + TS)             │
│                                                 │
│  ┌───────────┐  ┌────────────┐  ┌────────────┐  │
│  │  Routes   │  │    lib     │  │   Prisma   │  │
│  │ /profile  │  │  ai.ts     │  │   Client   │  │
│  │ /plan     │  │  prisma.ts │  │            │  │
│  └─────┬─────┘  └─────┬──────┘  └──────┬─────┘  │
│        │              │                │        │
└────────┼──────────────┼────────────────┼────────┘
         │              │                │
         ▼              ▼                ▼
   ┌──────────┐  ┌────────────┐  ┌────────────┐
   │  Neon    │  │ OpenRouter │  │   Neon     │
   │  Auth    │  │  (LLM API) │  │ PostgreSQL │
   └──────────┘  └────────────┘  └────────────┘
```

### Directory Structure

```
/
├── src/                      # Frontend source
│   ├── App.tsx               # Root: Router, AuthProvider
│   ├── main.tsx              # Entry point
│   ├── index.css             # Tailwind + dark theme
│   ├── context/
│   │   └── AuthContext.tsx   # Auth state, plan data, API calls
│   ├── helpers/
│   │   ├── constants.ts      # Form options, feature data
│   │   └── types.ts          # TypeScript interfaces
│   ├── lib/
│   │   ├── api.ts            # HTTP client
│   │   └── auth.ts           # Neon Auth client
│   ├── pages/
│   │   ├── Home.tsx          # Landing page
│   │   ├── Auth.tsx          # Sign in / Sign up
│   │   ├── Onboarding.tsx    # Questionnaire form
│   │   ├── Profile.tsx       # Plan display
│   │   └── Account.tsx       # Account management
│   └── components/
│       ├── layout/
│       │   └── Navbar.tsx
│       ├── plan/
│       │   ├── PlanDisplay.tsx
│       │   ├── DayCard.tsx
│       │   ├── ExerciseRow.tsx
│       │   └── RegeneratePlan.tsx
│       └── ui/
│           ├── Button.tsx
│           ├── Card.tsx
│           ├── Select.tsx
│           └── Textarea.tsx
├── server/                   # Backend source
│   ├── src/
│   │   ├── index.ts          # Express app setup
│   │   ├── lib/
│   │   │   ├── ai.ts         # OpenRouter prompt + response parsing
│   │   │   └── prisma.ts     # Prisma client
│   │   └── routes/
│   │       ├── profile.ts    # POST /api/profile
│   │       └── plan.ts       # POST,GET /api/plan/*
│   └── prisma/
│       └── schema.prisma     # Database schema
├── .env                      # Frontend env vars
├── .env.example
├── package.json
├── vite.config.ts
└── tsconfig*.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- A [Neon](https://neon.tech) account (database + auth)
- An [OpenRouter](https://openrouter.ai) API key

### Setup

**1. Clone and install dependencies**

```bash
cd SmartRep-AI-gym-planner
npm install          # Frontend
cd server && npm install  # Backend
```

**2. Configure environment variables**

Frontend (`./.env`):
```env
VITE_NEON_AUTH_URL=https://your-project.neonauth.your-region.neon.tech/neondb/auth
```

Backend (`./server/.env`):
```env
PORT=3001
BASE_URL=http://localhost:3001
DATABASE_URL=postgresql://...
OPEN_ROUTER_KEY=sk-or-v1-...
```

**3. Run database migrations**

```bash
cd server
npx prisma migrate deploy
```

**4. Start dev servers**

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
npm run dev
```

The app will be available at `http://localhost:5173`.

### Usage

1. **Sign up** via the Auth page
2. Complete the **Onboarding** questionnaire (goal, experience, schedule, equipment, split preference)
3. The AI generates a **custom training plan** — view it on your Profile page
4. Each day shows exercises with sets, reps, rest, and RPE
5. Use **Regenerate Plan** to create a new version with updated inputs

---

## API Routes

| Method | Endpoint            | Description                |
|--------|---------------------|----------------------------|
| POST   | `/api/profile`      | Create/update user profile |
| POST   | `/api/plan/generate`| Generate a new plan        |
| GET    | `/api/plan/current` | Fetch the latest plan      |

---

## Database Schema

Two tables managed by Prisma:

- **`user_profiles`** — Stores the user's onboarding answers
- **`training_plans`** — Stores generated plans as JSONB with versioning
