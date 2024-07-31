FROM node:20-alpine3.19 as build

# RUN apt-get update && apt-get install -y redis-server

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


#smallest image possible
FROM node:20-alpine3.19

RUN apk add --no-cache redis

WORKDIR /app

COPY package*.json ./
COPY --from=build /app /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 5000 6379
ENTRYPOINT [ "./entrypoint.sh" ]
