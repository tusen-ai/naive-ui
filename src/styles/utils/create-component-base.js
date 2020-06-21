export default function createBaseComponent (component) {
  let cachedStyleScheme = null
  return {
    getDerivedVariables: component.getDerivedVariables,
    get styleScheme () {
      if (!cachedStyleScheme) {
        cachedStyleScheme = this.createStyleScheme({
          base: this.theme.base,
          derived: this.theme.derived
        })
      }
      return cachedStyleScheme
    },
    customize (options = {}) {
      return Object.assign({}, this.styleScheme, options)
    }
  }
}
