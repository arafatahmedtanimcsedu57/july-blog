FROM node:22-alpine as base

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

# Set working directory for all stages
WORKDIR /home/node/app

# Copy dependency files once (shared across stages)
COPY package.json yarn.lock ./

# Development build stage
FROM base AS builder

# Install all dependencies (including devDependencies for build)
RUN yarn install

# Copy all source code
COPY . .

# Build the app
RUN yarn build

# Production image
FROM base AS runtime

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

# Copy only the built output from builder
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build
COPY --from=builder /home/node/app/public ./public

EXPOSE 3000

CMD ["node", "dist/server.js"]
