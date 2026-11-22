# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile

COPY tsconfig.json tsup.config.ts prisma.config.ts ./
COPY prisma ./prisma
COPY src ./src

# Dummy DATABASE_URL for build-time prisma generate only
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/doomsday_ready?schema=public"

# Generate Linux-compatible Prisma client & build TypeScript bundle
RUN pnpm exec prisma generate
RUN pnpm run build

# Stage 2: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN pnpm install --prod --frozen-lockfile && pnpm add -D prisma

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 5000

CMD ["sh", "-c", "pnpm exec prisma migrate deploy && node dist/server.js"]

