// terse cssr
const { replaceDefine, outDirs, srcDir } = require('../utils')
const { terseCssr } = require('./terse-cssr')

// replace __DEV__

const { genWebTypes } = require('./gen-web-types')
const { completePath } = require('./complete-path')

;

(async () => {
  await terseCssr()
  await replaceDefine(outDirs, {
    __DEV__: 'process.env.NODE_ENV !== \'production\''
  })
  await replaceDefine([srcDir], {
    // the sequence is crucial
    '\'lodash\'': '\'lodash-es\''
  })

  // complete require and import source path
  await completePath(['es'])

  // generate web-types.json for webstorm & vetur
  // web-types.json is only a very loose description for auto-complete
  // vscode is a much better choice
  genWebTypes()
})()
