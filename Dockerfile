# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

COPY .env .env


# Install Redis
RUN apt-get update && apt-get install -y redis-server

# Copy the Redis configuration file (optional)
# COPY redis.conf /usr/local/etc/redis/redis.conf
RUN npm run build
# Expose the necessary ports
EXPOSE 5000 6379

# Set environment variables for Redis
ENV REDIS_HOST=localhost
ENV REDIS_PORT=6379

# Start Redis and the Node.js application
CMD redis-server --daemonize yes && npm start
