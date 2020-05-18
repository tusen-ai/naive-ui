/**
 * staputed means static computed, it behaves like a data property. If it's
 * same after calculation, it won't cause re-render.
 */
export default function (options) {
  const keys = Object.keys(options)
  const data = {}
  const watch = {}
  const mixin = {
    watch,
    created () {
      keys.forEach(key => {
        this[key] = options[key].get.call(this)
      })
    },
    data () {
      return data
    }
  }
  keys.forEach(key => {
    const computedData = options[key]
    data[key] = computedData.default
    for (const dep of computedData.deps) {
      watch[dep] = function () {
        this[key] = computedData.get.call(this)
      }
    }
  })
  return mixin
}
