#!/bin/sh


echo "=============== Starting Redis server ==============="
redis-server --daemonize yes

echo "=============== Starting node server ==============="
npm start
