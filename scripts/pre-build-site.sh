npm pack
UI_PACKAGE_NAME=$(ls | grep naive-ui)
tar -xzvf $UI_PACKAGE_NAME
mv package node_modules/naive-ui
rm $UI_PACKAGE_NAME
