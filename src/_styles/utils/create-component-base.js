export default function createBaseComponent (options) {
  const cache = {
    localVars: null,
    globalVars: null,
    overrides: null
  }
  const {
    name,
    theme,
    peer,
    getLocalVars
  } = options
  function updateVars () {
    cache.localVars = Object.assign(
      getLocalVars(cache.globalVars),
      cache.overrides
    )
  }
  return {
    name,
    theme,
    peer,
    getLocalVars (globalVars) {
      if (cache.globalVars === null) {
        cache.globalVars = globalVars
      }
      if (cache.localVars === null) {
        updateVars()
      }
      return cache.localVars
    },
    override (vars) {
      cache.overrides = vars
      cache.localVars = null
    }
  }
}
