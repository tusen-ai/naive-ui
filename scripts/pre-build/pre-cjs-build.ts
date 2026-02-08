import { replaceDefine, srcDir } from '../utils'

;

(async () => {
  await replaceDefine([srcDir], {
    '\'lodash-es\'': '\'lodash\''
  })
})()
