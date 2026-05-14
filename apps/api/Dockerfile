# Base stage for shared dependencies
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo

# Prune stage to isolate the API app
FROM base AS pruner
COPY . .
RUN turbo prune ayragen-api --docker

# Installer stage to build the pruned workspace
FROM base AS installer
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm install

COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

# Build the project
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma
RUN npm run build --filter=ayragen-api...

# Runner stage to execute the app
FROM node:20-alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=installer /app/apps/api/package.json .
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/api/dist ./dist
COPY --from=installer /app/apps/api/prisma ./prisma

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

CMD ["node", "dist/main.js"]
