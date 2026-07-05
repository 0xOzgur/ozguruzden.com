#!/bin/bash
# ozguruzden.com deploy script
# Sunucuda repo kökünden çalıştırılır: ./deploy.sh [branch]
# Varsayılan branch: main

set -euo pipefail

BRANCH="${1:-main}"
APP_DIR="$(cd "$(dirname "$0")" && pwd)"
BUILD_TMP="build_new"

cd "$APP_DIR"

echo "==> [1/5] Git güncelleniyor (origin/$BRANCH)..."
git fetch origin
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

echo "==> [2/5] Bağımlılıklar kuruluyor..."
npm ci

echo "==> [3/5] Site derleniyor..."
rm -rf "$BUILD_TMP"
BUILD_PATH="$BUILD_TMP" npm run build

echo "==> [4/5] Yeni build yayına alınıyor..."
rm -rf build
mv "$BUILD_TMP" build

echo "==> [5/5] Mail sunucusu yeniden başlatılıyor..."
if pm2 describe ozguruzden-server > /dev/null 2>&1; then
    pm2 restart ozguruzden-server
else
    pm2 start ecosystem.config.js --env production
fi

# Artık kullanılmayan AI sunucusu hâlâ kayıtlıysa kaldır
if pm2 describe ai-server > /dev/null 2>&1; then
    echo "==> Eski ai-server süreci kaldırılıyor..."
    pm2 delete ai-server
    pm2 save
fi

echo ""
echo "✔ Deploy tamamlandı: $(git rev-parse --short HEAD) ($BRANCH)"
