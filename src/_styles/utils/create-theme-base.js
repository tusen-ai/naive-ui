export default function createThemeBase (theme) {
  const initialBaseVars = theme.getBaseVars()
  const cache = {
    vars: null,
    overrides: null
  }
  function override (vars) {
    cache.overrides = vars
    updateVars()
  }
  function updateVars () {
    const { overrides } = cache
    const baseVars = {
      ...initialBaseVars,
      overrides
    }
    const derivedVars = theme.getDerivedVars(baseVars)
    cache.vars = Object.assign(baseVars, derivedVars, overrides)
  }
  return {
    name: theme.name,
    theme: theme.theme,
    get vars () {
      if (!cache.vars) {
        updateVars()
      }
      return cache.vars
    },
    override
  }
}
