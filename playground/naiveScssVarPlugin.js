module.exports = function naiveSCSSExportVariable () {
  return {
    name: 'naive-scss-export-variable',
    resolveId (source) {
      if (source.endsWith('jsIndex.scss')) {
        return 'naive-scss-js-index'
      }
      return null
    },
    load (id) {
      if (id === 'naive-scss-js-index') {
        return `export default 'naive-scss-js-index'`
      }
      return null
    }
  }
}
