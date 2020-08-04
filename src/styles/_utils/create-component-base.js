function mergedObject (base, override) {
  if (!base) return override
  if (!override) return base
  console.log('base, override', base, override)
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
    getDerivedVariables: component.getDerivedVariables,
    cssrProps (themeVariables) {
      if (!cachedCssrProps) {
        cachedCssrProps = mergedObject(
          this.getDerivedVariables(themeVariables),
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
