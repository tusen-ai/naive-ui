const ID = '/virtual-contributors'

export function Contributors (data) {
  return {
    name: 'naive-ui-contributors',
    resolveId (id) {
      return id === ID ? ID : null
    },
    load (id) {
      if (id !== ID) return null
      return `export default ${JSON.stringify(data)}`
    }
  }
}
