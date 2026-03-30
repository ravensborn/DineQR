FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY apps/menu/package.json apps/menu/
COPY packages/shared/package.json packages/shared/
RUN pnpm install --frozen-lockfile || pnpm install

FROM base AS development
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/menu/node_modules ./apps/menu/node_modules
COPY . .
WORKDIR /app/apps/menu
EXPOSE 3000
CMD ["pnpm", "dev"]
