#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKEND="$ROOT/backend"
FRONTEND="$ROOT/frontend"

echo "=== Campus Events App Setup ==="

echo "[1/3] Installing backend dependencies..."
cd "$BACKEND"
npm install

echo "[2/3] Installing frontend dependencies..."
cd "$FRONTEND"
npm install

echo "=== Setup done ==="
echo "1) Configure backend: cp backend/.env.example backend/.env and edit DB credentials."
echo "2) Initialize DB: cd backend && npm run db:setup"
echo "3) Start backend: npm run dev"
echo "4) Start frontend: cd frontend && npm run dev"
