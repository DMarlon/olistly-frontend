#!/bin/bash
function error {
    echo
    echo "# $1"
    exit -1
}

echo "= Starting project locally"


[ ! -f .env.* ] && error "First create a file [.env.local, .env.production, .env.anything] with VUE_APP_FRONT_URL and VUE_APP_API_URL configuration!"

echo
echo "= Check docker"
if [ -z `command -v docker` ]; then
	error "Docker is necessary"
fi
echo "- Docker is ok!"

echo
echo "= Try to run Frontend Olistly on http://localhost:8081"

NODE_BUILD="docker run -it --rm -v "$PWD":/app -w /app -p 8081:8080 node:14-alpine npm "
$NODE_BUILD run serve || error "Run failed."

echo "- Build completed"

