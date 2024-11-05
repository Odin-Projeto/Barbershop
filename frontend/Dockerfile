FROM node:20-alpine

WORKDIR /usr/src/workspace/frontend

# precisamos do git para adicionar o lint da VX
RUN apk add git

CMD npm i && npm run dev

EXPOSE 5173
