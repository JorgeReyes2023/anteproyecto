FROM node:18-alpine AS base

# Instalar dependencias para Prisma
RUN apk add --no-cache openssl curl dumb-init

# Crear usuario no root
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nodeclient -u 1001 -G nodejs

WORKDIR /app

# Etapa de desarrollo
FROM base AS dev

ENV NODE_ENV=development

# Copiar archivos de paquetes
COPY package*.json ./

# Instalar dependencias
RUN npm ci --silent

# Copiar el esquema de Prisma ANTES de generar el cliente
COPY prisma ./prisma

# CORRECCIÓN: Generar Prisma Client para Linux Alpine
RUN npx prisma reset

# Copiar el código fuente
COPY . .

CMD ["dumb-init", "npm", "run", "dev"]

# Etapa de producción
FROM base AS production

ENV NODE_ENV=production

# Copiar archivos de paquetes
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --only=production --silent && npm cache clean --force

# Copiar el esquema de Prisma
COPY prisma ./prisma

# CORRECCIÓN: Generar Prisma Client para producción
RUN npx prisma generate

# Copiar la aplicación compilada
COPY dist ./dist

# Cambiar la propiedad
RUN chown -R nodeclient:nodejs /app

USER nodeclient

EXPOSE 3000

CMD ["dumb-init", "npm", "start"]