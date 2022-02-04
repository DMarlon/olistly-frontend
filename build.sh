#!/bin/bash
function error {
    echo
    echo "# $1"
    exit -1
}

echo "= Check docker"
if [ -z `command -v docker` ]; then
	error "Docker is necessary"
fi
echo "- Docker is ok!"

[ ! -f .env.* ] && error "First create a file [.env.local, .env.production, .env.anything] with VUE_APP_FRONT_URL and VUE_APP_API_URL configuration!"

echo
echo "= Build Frontend Olistly"

NODE_BUILD="sudo docker run -it --rm -v $PWD:/app -w /app node:14 npm"
$NODE_BUILD install || error "Install dependencies failed."
$NODE_BUILD run build || error "Build failed."

echo "- Build completed"

echo
echo "= Ziping build Olistly"

DIST_DIR=dist
DIST_ZIP=dist.zip

[ -f $DIST_ZIP ] && rm -f $DIST_ZIP
[ -f $DIST_ZIP ] && error "Error deleting file '$DIST_ZIP'."

zip -9r $DIST_ZIP $DIST_DIR

[ -f $DIST_ZIP ] && echo "- Zip completed, generete file '$DIST_ZIP' with build Olistly."
[ ! -f $DIST_ZIP ] && echo "- Error to zip dir '$DIST_DIR'."
