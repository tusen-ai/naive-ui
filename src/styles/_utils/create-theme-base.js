export default function createThemeBase (theme) {
  function override (options = {}) {
    baseOverrided = options.base
    derivedOverrided = options.derived
  }
  let baseOverrided = null
  let derivedOverrided = null
  let cachedBased = null
  let cachedDerived = null
  return {
    name: theme.name,
    theme: theme.theme,
    get base () {
      if (!cachedBased) {
        cachedBased = Object.assign(this.getBaseVariables(), baseOverrided)
      }
      return cachedBased
    },
    getBaseVariables: theme.getBaseVariables,
    getDerivedVariables: theme.getDerivedVariables,
    get derived () {
      if (!cachedDerived) {
        cachedDerived = Object.assign(this.getDerivedVariables(this.base), derivedOverrided)
      }
      return cachedDerived
    },
    override
  }
}
