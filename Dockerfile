FROM node:18-alpine

WORKDIR /app

# Installation des dépendances système requises par Prisma
RUN apk add --no-cache openssl libc6-compat

ENV NODE_OPTIONS="--max-old-space-size=2048"

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push --skip-generate && node prisma/seed.js && npm run start"]