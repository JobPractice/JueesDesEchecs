# Stage 1: Build
FROM node:24 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: Production
FROM node:24-alpine

WORKDIR /usr/src/app

# Copia sólo los archivos necesarios de la etapa build
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 911

CMD ["node", "dist/main.js"]