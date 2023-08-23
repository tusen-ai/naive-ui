const { CONR_ID } = require('./utils/virtual-contributors')

function createContributorsPlugin (data) {
  return {
    name: 'virtual-contributors',
    resolveId (id) {
      return id === CONR_ID ? CONR_ID : null
    },
    load (id) {
      if (id !== CONR_ID) {
        return null
      }
      return `export default ${JSON.stringify(data)}`
    }
  }
}

module.exports = createContributorsPlugin
