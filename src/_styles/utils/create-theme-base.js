export default function createThemeBase (theme) {
  const initialBaseVars = theme.getBaseVars()
  const cache = {
    globalVars: null,
    overrides: null
  }
  function updateVars () {
    const { overrides } = cache
    const baseVars = {
      ...initialBaseVars,
      overrides
    }
    const derivedVars = theme.getDerivedVars(baseVars)
    cache.globalVars = Object.assign(baseVars, derivedVars, overrides)
  }
  return {
    name: theme.name,
    theme: theme.theme,
    getGlobalVars () {
      if (!cache.globalVars) {
        updateVars()
      }
      return cache.globalVars
    },
    override (vars) {
      cache.overrides = vars
      updateVars()
    }
  }
}
