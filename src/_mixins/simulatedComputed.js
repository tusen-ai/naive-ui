/**
 * simulatedComputed means it behaves like a computed property except the if it's
 * same after re-calculation, it won't cause re-rendering.
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
      return Object.assign({}, data)
    }
  }
  keys.forEach(key => {
    const computedData = options[key]
    data[key] = computedData.default
    computedData.deps.forEach(dep => {
      watch[dep] = function () {
        const result = computedData.get.call(this)
        if (result !== this[key]) {
          this[key] = result
        }
      }
    })
  })
  return mixin
}
