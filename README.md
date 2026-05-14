# AyraGen Cinematic Platform

A high-performance monorepo for generating cinematic, emotionally-intelligent websites using AI.

## Project Structure

```text
/PROJECT
├── apps/
│   ├── api/          # NestJS Backend (OpenAI, BullMQ, Prisma)
│   └── web/          # Next.js Frontend (Framer Motion, Socket.io)
├── packages/
│   ├── schema/       # Shared Zod schemas and TypeScript types
│   └── ui-config/    # Shared design tokens and emotional presets
├── turbo.json        # Turborepo orchestration
├── tsconfig.base.json # Shared TypeScript rules
└── package.json      # Workspace orchestration
```

## Getting Started

### Prerequisites
- Node.js (v20+)
- npm

### Installation
```bash
npm install
```

### Development
Start both backend and frontend in parallel:
```bash
npm run dev
```

### Build
Build all apps and packages:
```bash
npm run build
```

### Clean
Remove all build artifacts and node_modules:
```bash
npm run clean
```

## Environment Configuration

### Backend (`apps/api/.env`)
- `OPENAI_API_KEY`: Your OpenAI API Key.
- `PORT`: Default is 3001.

## Architecture Highlights
- **Standardized Builds**: All apps build to a flat `dist/` or `.next/` directory.
- **Strict-Ready**: Centralized `tsconfig.base.json` for consistent type safety.
- **AI Stability**: Early environment loading ensures OpenAI SDK is always ready.
