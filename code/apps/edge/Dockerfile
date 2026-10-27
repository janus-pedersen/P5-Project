# Build image
FROM node:24-bookworm-slim AS build

WORKDIR /app

RUN corepack enable

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm --filter ./apps/edge... build
RUN pnpm --filter ./apps/edge --prod deploy --legacy /deploy

# Production image
FROM node:24-bookworm-slim

WORKDIR /app

COPY --from=build /deploy ./

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]