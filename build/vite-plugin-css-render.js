const cleanCssr = require('./utils/terse-cssr')

module.exports = () => {
  return {
    name: 'css-render-vite',
    transform (src, id) {
      if (id.endsWith('.cssr.js')) {
        return {
          code: cleanCssr(src),
          map: null
        }
      }
    }
  }
}
