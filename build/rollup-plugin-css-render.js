const cleanCssr = require('./utils/clean-cssr')

module.exports = () => ({
  async transform (code, id) {
    if (id.endsWith('.cssr.js')) {
      return cleanCssr(code)
    }
  }
})
