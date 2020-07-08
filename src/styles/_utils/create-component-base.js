export default function createBaseComponent (component) {
  let cachedCssrProps = null
  return {
    name: component.name,
    theme: component.theme,
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
