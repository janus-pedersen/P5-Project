# Build image
FROM node:24-bookworm-slim AS build

WORKDIR /app

RUN corepack enable

COPY . .

RUN pnpm install --frozen-lockfile --filter "./apps/edge/sync..."
RUN pnpm --filter "./apps/edge/sync" build

# Production image
FROM node:24-bookworm-slim

WORKDIR /app

COPY --from=build /app/apps/edge/sync/dist ./

ENV NODE_ENV=production

CMD ["node", "--enable-source-maps", "index.js"]
