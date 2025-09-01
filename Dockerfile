# Usar la imagen base de Node.js
FROM node:18-alpine AS base

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar dependencias
RUN npm ci --only=production && npm cache clean --force

# Etapa de construcción
FROM base AS builder
WORKDIR /app

# Instalar todas las dependencias (incluyendo dev)
COPY package*.json ./
RUN npm ci

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:18-alpine AS production

# Crear usuario no root para seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

WORKDIR /app

# Copiar dependencias de producción
COPY --from=base /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Cambiar ownership al usuario nestjs
RUN chown -R nestjs:nodejs /app
USER nestjs

# Exponer el puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]