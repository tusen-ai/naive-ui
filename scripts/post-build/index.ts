import { outDirs, replaceDefine, srcDir } from '../utils'
import { checkArtifacts } from './check-artifacts'
import { completePath } from './complete-path'
import { terseCssr } from './terse-cssr'

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
  // Imported only now: it loads src, which must be back on lodash-es, since
  // native ESM can't take named imports from the CommonJS lodash
  const { genWebTypes } = await import('./gen-web-types')
  genWebTypes()

  // Fail the build if dts/output embeds host filesystem paths.
  await checkArtifacts()
})()
