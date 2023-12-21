// replace lodash-es
const { replaceDefine, srcDir } = require('../utils')

;(async () => {
  await replaceDefine([srcDir], {
    "'lodash-es'": "'lodash'",
    "'date-fns/esm(.*)'": "'date-fns$1'//"
  })
})()
