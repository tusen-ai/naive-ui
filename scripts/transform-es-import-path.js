const { statSync } = require('fs')
const { dirname, resolve: pathResolve } = require('path')

const rePathLocal = /^(\.\.?\/)(.*\/)?([^./]*)$/

function tryExts (base, exts, extsDir) {
  const count = {
    total: exts.length,
    notFile: 0,
    error: 0
  }
  for (const ext of exts) {
    let fst
    try {
      fst = statSync(base + ext)
      if (fst.isFile()) {
        return { ext, fst }
      } else if (fst.isDirectory()) {
        return tryExts(
          base,
          extsDir.map((ed) => `${ext}${ed}`),
          extsDir
        )
      }
      count.notFile += 1
    } catch (e) {
      count.error += 1
    }
  }
  throw new Error(
    `Could not resolve path ${JSON.stringify(base)} with exts ${JSON.stringify(
      exts
    )}: ${JSON.stringify(count)}`
  )
}

function transformImportPath (originalPath, callingFileName, options) {
  if (originalPath === 'date-fns/locale/en-US') {
    return 'date-fns/locale/en-US/index.js'
  }
  const plm = originalPath.match(rePathLocal)
  if (plm) {
    const fp = pathResolve(dirname(callingFileName), originalPath)
    let fst
    let fstEx
    let fse
    try {
      ;({ fst, ext: fstEx } = tryExts(fp, ['', '.js'], ['/index.js']))
    } catch (e) {
      fse = e
    }
    if (fst) return originalPath + fstEx
    else if (fse) throw fse
  }
  return originalPath
}

module.exports = transformImportPath
