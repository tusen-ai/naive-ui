const sass = require('node-sass')
const path = require('path')

function createStyleScheme (css) {
  return css
    .replace(':export', 'export default')
    .replace(/:\s/g, `: '`)
    .replace(/;/g, `',`)
}

module.exports = function naiveSCSSExportVariable () {
  return {
    name: 'naive-scss-export-variable',
    resolveId (source, importer) {
      if (source.endsWith('.scss')) {
        return path.resolve(path.dirname(importer), source)
      }
      return null
    },
    load (id) {
      if (id.endsWith('.scss')) {
        const css = sass.renderSync({
          file: id,
          outputStyle: 'expanded'
        }).css.toString()
        const styleScheme = createStyleScheme(css)
        return styleScheme
      }
    }
  }
}
