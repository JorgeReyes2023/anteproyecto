# ===== DOCKERFILE MULTI-STAGE POUR BACKEND NODE.JS =====

# Stage 1: Base image with dependencies
FROM node:18-alpine AS base

# Update Alpine packages and install dumb-init for proper signal handling
RUN apk update && apk upgrade && apk add --no-cache dumb-init

# Create app directory with proper user
RUN addgroup -g 1001 -S nodejs && \ 
  adduser -S nodeclient -u 1001

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Stage 2: Development build
FROM base AS dev

ENV NODE_ENV=development

# Install dev dependencies
RUN npm ci

# Copy source code
COPY --chown=nodeclient:nodejs . .

# Generate Prisma client
RUN npx prisma generate

USER nodeclient

EXPOSE 3000

# Start with nodemon for development
CMD ["dumb-init", "npm", "run", "dev"]

# Stage 3: Production build
FROM base AS production

ENV NODE_ENV=production

# Copy source code
COPY --chown=nodeclient:nodejs . .

# Generate Prisma client for production
RUN npx prisma generate

# Remove unnecessary files
RUN rm -rf tests/ docs/ coverage/ prisma/migrations/

USER nodeclient

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node --version || exit 1

# Start application
CMD ["dumb-init", "npm", "start"]