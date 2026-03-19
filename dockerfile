# Stage 1: Build
FROM node:24 AS builder

WORKDIR /usr/src/app
# Stage 2: Production

WORKDIR /usr/src/app

# Install only production dependencies
COPY package*.json ./

RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 911

# Run compiled app
CMD ["npm", "start"]