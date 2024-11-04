FROM node:20-alpine as builder

WORKDIR /usr/src/workspace/backend

# precisamos do git para adicionar o lint da VX
RUN apk add git

CMD npm i && npx prisma generate && npx prisma db seed && npm run start:dev

EXPOSE 3000