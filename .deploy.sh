#!/usr/bin/env bash

set -e

git pull --ff-only origin main

composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader
php craft up --interactive=0
php craft migrate/all --interactive=0
php craft clear-caches/all
php craft queue/run --interactive=0
