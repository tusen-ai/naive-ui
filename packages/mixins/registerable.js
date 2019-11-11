export default function (
  inject,
  collectionKey,
  registerKey = 'value'
) {
  return {
    watch: {
      [registerKey]: function (value, oldValue) {
        if (this[inject]) {
          this.registerInstance(value, oldValue)
        }
      }
    },
    created () {
      if (this[inject]) {
        this.registerInstance(this[registerKey])
      }
    },
    beforeDestroy () {
      if (this[inject]) {
        this.registerInstance(undefined, this[registerKey])
      }
    },
    methods: {
      registerInstance (key = undefined, oldKey = undefined) {
        if (!key && !oldKey) return
        if (this[inject]) {
          const collection = this[inject][collectionKey]
          if (oldKey !== undefined) this.removeInstance(collection, oldKey)
          if (key !== undefined) this.addInstance(collection, key)
        }
      },
      removeInstance (collection, key) {
        if (!collection[key]) collection[key] = []
        const indexOfInstance = collection[key].findIndex(instance => instance === this)
        if (~indexOfInstance) collection[key].splice(indexOfInstance, 1)
      },
      addInstance (collection, key) {
        if (!collection[key]) collection[key] = []
        const indexOfInstance = collection[key].findIndex(instance => instance === this)
        if (!~indexOfInstance) collection[key].push(this)
      }
    }
  }
}
