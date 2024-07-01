#!/bin/bash

source .env

# Function to check if Redis is up
is_redis_up() {
    nc -z "$REDIS_HOST" "$REDIS_PORT"
    return $?
}

# # Loop until Redis is available
while ! is_redis_up; do
    echo "Waiting for Redis..."
    sleep 10
done

# echo "Redis is up - executing application start..."

# Place your application start command here
node ./dist/app.js
