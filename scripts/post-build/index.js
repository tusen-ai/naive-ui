// terse cssr
const { terseCssr } = require('./terse-cssr')

// replace __DEV__
const { replaceDefine, outDirs, srcDir } = require('../utils')

;(async () => {
  await terseCssr()
  await replaceDefine(outDirs, {
    __DEV__: "process.env.NODE_ENV !== 'production'"
  })
  await replaceDefine([srcDir], {
    "'lodash'": "'lodash-es'"
  })
})()
