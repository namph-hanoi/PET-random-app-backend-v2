#!/usr/bin/env bash

# Wait until the database gets ready
echo "[Bootstrap] Confirm DB parameters."
echo "${DB_HOST} -U ${DB_USER} -p ${DB_PORT} -c"

until PGPASSWORD=${DB_PASSWORD} psql -h ${DB_HOST} -U ${DB_USER} -p ${DB_PORT}; do
    >&2 echo "[Bootstrap] Warn: PostgreSQL is not available. Wait for 1 second..."
    sleep 1
done
echo "[Bootstrap] PostgreSQL is ready."

# Create database if not exists
PGPASSWORD=${DB_PASSWORD} psql -h ${DB_HOST} -U ${DB_USER} -p ${DB_PORT} -l | grep ${DB_NAME}; \
if [ $? -ne 0 ]; then \
  psql -h ${DB_HOST} -U ${DB_USER} -p ${DB_PORT} -c "CREATE DATABASE ${DB_NAME} ENCODING 'UTF8';"
fi

# Migration
echo "[Bootstrap] Executing DB migration..."
npx sequelize-cli db:migrate
echo "[Bootstrap] Done DB migration."

# Trap SIGTERM
trap 'echo "TRAPPED SIGTERM! Going to kill $PID ..."; kill -15 $PID; wait $PID' TERM

echo "[Bootstrap] Starting server..."
yarn dev
PID=$!
wait $PID
