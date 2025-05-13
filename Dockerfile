# Étape 1 : Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Étape 2 : Runtime
FROM node:18-alpine

WORKDIR /app

# Create uploads directory and set permissions
RUN mkdir -p /app/uploads && \
    chown node:node /app/uploads

USER node

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Utilise les variables d'environnement si besoin
EXPOSE 3000

CMD ["node", "dist/main.js"]
