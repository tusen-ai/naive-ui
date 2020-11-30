function mergedObject (base, override) {
  if (!base) return override
  if (!override) return base
  const clonedBase = { ...base }
  Object.keys(override).forEach(key => {
    if (typeof override[key] !== 'object') {
      if (key in clonedBase && typeof clonedBase[key] !== 'object') {
        clonedBase[key] = override[key]
      }
    } else {
      if (key in clonedBase && typeof clonedBase[key] === 'object') {
        clonedBase[key] = mergedObject(
          clonedBase[key],
          override[key]
        )
      }
    }
  })
  return clonedBase
}

export default function createBaseComponent (component) {
  let cachedCssrProps = null
  let cssrPropsOverrided = null
  return {
    name: component.name,
    theme: component.theme,
    peer: component.peer,
    getDerivedVars: component.getDerivedVars,
    cssrProps (themeVariables) {
      if (!cachedCssrProps) {
        cachedCssrProps = mergedObject(
          this.getDerivedVars(themeVariables),
          cssrPropsOverrided
        )
      }
      return cachedCssrProps
    },
    override (options) {
      cssrPropsOverrided = options
    }
  }
}
