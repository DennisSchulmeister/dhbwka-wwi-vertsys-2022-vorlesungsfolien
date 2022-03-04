#! /bin/sh
set -e

npm run build
rsync -rvz build/ dennis@vhermes:/srv/www/www.wpvs.de/repo/vertsys-2022/vorlesungsfolien
