FROM node:20

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npx prisma generate

RUN npm run build

EXPOSE 911

CMD ["node", "dist/main.js"]

