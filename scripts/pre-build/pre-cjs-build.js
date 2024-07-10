// replace lodash-es
// const { replaceDefine, srcDir } = require('../utils')
import { replaceDefine, srcDir } from '../utils/index.js'
;(async () => {
  await replaceDefine([srcDir], {
    "'lodash-es'": "'lodash'",
    "'date-fns/esm(.*)'": "'date-fns$1'//"
  })
})()
