FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN if [ -f .env ]; then cp .env .env; fi

RUN apt-get update && apt-get install -y redis-server


RUN npm run build

EXPOSE 5000 6379

ENV REDIS_HOST=localhost
ENV REDIS_PORT=6379

CMD redis-server --daemonize yes && npm start
