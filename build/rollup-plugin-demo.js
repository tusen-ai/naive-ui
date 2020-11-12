const getDemoByPath = require('./utils/get-demo-by-path')

module.exports = function () {
  return {
    async load (id) {
      return getDemoByPath(id)
    }
  }
}
