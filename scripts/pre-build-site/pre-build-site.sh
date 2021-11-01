curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm@6
pnpm run build:package

pnpm pack
UI_PACKAGE_NAME=$(ls | grep naive-ui)
tar -xzvf $UI_PACKAGE_NAME
mv package node_modules/naive-ui
rm $UI_PACKAGE_NAME
