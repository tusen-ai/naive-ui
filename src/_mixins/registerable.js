export default function (
  injectionName,
  collectionKey,
  registerKey = 'value'
) {
  return {
    watch: {
      [registerKey]: function (value, oldValue) {
        this.registerInstance(value, oldValue)
      }
    },
    created () {
      this.registerInstance(this[registerKey])
    },
    beforeUnmount () {
      this.registerInstance(undefined, this[registerKey])
    },
    methods: {
      registerInstance (key = undefined, oldKey = undefined) {
        if (key === undefined && oldKey === undefined) return
        const injection = this[injectionName]
        const collection = injection[collectionKey]
        if (oldKey !== undefined) this.removeInstance(collection, oldKey)
        if (key !== undefined) this.addInstance(collection, key)
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
