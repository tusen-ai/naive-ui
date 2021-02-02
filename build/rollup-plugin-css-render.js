const cleanCssr = require('./utils/terse-cssr')

module.exports = () => ({
  async transform (code, id) {
    if (id.endsWith('.cssr.ts')) {
      return cleanCssr(code)
    }
  }
})
