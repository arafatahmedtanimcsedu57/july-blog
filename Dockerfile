# ─── Builder Stage ──────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build:payload && yarn build:server && yarn copyfiles

# ─── Runtime Stage ──────────────────────────────────────────────
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY package.json yarn.lock ./
COPY .env ./
RUN yarn install --production

CMD ["yarn", "serve"]
