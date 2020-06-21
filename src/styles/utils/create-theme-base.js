export default function createThemeBase (theme) {
  function customize (options = {}) {
    const {
      base = {},
      derived = {}
    } = options
    const syntheticBase = Object.assign({}, this.base, base)
    const syntheticDerived = Object.assign(
      {},
      this.createDerivedVariables(syntheticBase),
      derived
    )
    return {
      base: syntheticBase,
      derived: syntheticDerived
    }
  }
  let cachedBased = null
  let cachedDerived = null
  return {
    get base () {
      if (!cachedBased) {
        return this.getBaseVariables()
      }
    },
    getBaseVariables: theme.getBaseVariables,
    getDerivedVariables: theme.getDerivedVariables,
    get derived () {
      if (!cachedDerived) {
        cachedDerived = this.getDerivedVariables(this.base)
      }
      return cachedDerived
    },
    customize
  }
}
