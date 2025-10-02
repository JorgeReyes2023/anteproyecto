FROM node:18-alpine AS base

# Install dependencies for Prisma
RUN apk add --no-cache openssl curl dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nodeclient -u 1001 -G nodejs

WORKDIR /app

# Stage dev
FROM base AS dev

ENV NODE_ENV=development

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --silent

# Copy prisma schema AVANT de générer le client
COPY prisma ./prisma

# CORRECTION: Générer Prisma Client pour Linux Alpine
RUN npx prisma generate

# Copy source code
COPY . .

# Change ownership
RUN chown -R nodeclient:nodejs /app

USER nodeclient

EXPOSE 3000

CMD ["dumb-init", "npm", "run", "dev"]

# Stage production
FROM base AS production

ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production --silent && npm cache clean --force

# Copy prisma schema
COPY prisma ./prisma

# CORRECTION: Générer Prisma Client pour production
RUN npx prisma generate

# Copy built application
COPY dist ./dist

# Change ownership
RUN chown -R nodeclient:nodejs /app

USER nodeclient

EXPOSE 3000

CMD ["dumb-init", "npm", "start"]