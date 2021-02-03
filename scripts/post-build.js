// terse cssr
const { terseCssr } = require('./terse-cssr')

// replace __DEV__
const { replaceDefine } = require('./replace-define')

;(async () => {
  await terseCssr()
  await replaceDefine()
})()
