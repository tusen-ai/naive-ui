export default function createBaseComponent (component) {
  let cachedCssrProps = null
  return {
    getDerivedVariables: component.getDerivedVariables,
    cssrProps (themeVariables) {
      if (!cachedCssrProps) {
        cachedCssrProps = this.getDerivedVariables(themeVariables)
      }
      return cachedCssrProps
    },
    customize (options = {}) {
      // TODO
    }
  }
}
