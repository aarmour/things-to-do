#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER ttd;
    CREATE DATABASE ttd TEMPLATE template_postgis;
    GRANT ALL PRIVILEGES ON DATABASE ttd TO ttd;
EOSQL
