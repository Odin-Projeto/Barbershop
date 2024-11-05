# Fase de build
FROM node:18-alpine AS builder

WORKDIR /usr/src/workspace/backend

# Instalar git para o linting
RUN apk add --no-cache git openssl libc6-compat

ENV DATABASE_URL="file:./dev.db"

# Copiar apenas os arquivos de dependências para aproveitar o cache
COPY . .

# Instalar dependências e executar migrações
RUN npm install -g @nestjs/cli
RUN npm install
RUN npx prisma generate
RUN npx prisma migrate dev


# Executar o backend
CMD ["npm", "run", "start:dev"]

# Expor a porta do backend
EXPOSE 3000
