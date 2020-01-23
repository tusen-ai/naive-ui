export default function (
  injectionName,
  collectionProperty,
  registerProperty = 'value',
  bubble = false,
  disabledCollectable = null
) {
  const registerPropertyChangeHandler = function (value, oldValue) {
    if (this.activeCollectableInjection) {
      this.registerValue(value, oldValue)
    }
  }
  const watch = {
    [registerProperty]: registerPropertyChangeHandler
  }
  return {
    computed: {
      activeCollectableInjection () {
        if (Array.isArray(injectionName)) {
          const activeInjectionIndex = injectionName.findIndex(key => this[key])
          if (~activeInjectionIndex) {
            return this[injectionName[activeInjectionIndex]]
          }
        } else {
          return this[injectionName]
        }
        return null
      }
    },
    watch,
    created () {
      if (this.activeCollectableInjection) {
        this.registerValue(this[registerProperty])
      }
    },
    mounted () {
      if (this.activeCollectableInjection) {
        this.registerValue(this[registerProperty])
      }
    },
    beforeDestroy () {
      // console.log('before destroy', this.name, this.$el)
      if (this.activeCollectableInjection) {
        this.registerValue(undefined, this[registerProperty])
      }
    },
    destroyed () {
      // console.log('destroyed', this.name)
    },
    methods: {
      registerValue (value = undefined, oldValue = undefined) {
        // console.log('registerValue')
        let currentInjection = this.activeCollectableInjection
        while (currentInjection) {
          if (disabledCollectable && disabledCollectable.call(this, currentInjection)) return
          const collectedValues = currentInjection[collectionProperty]
          if (oldValue !== undefined) {
            const oldValueIndex = collectedValues.findIndex(collectedValue => collectedValue === oldValue)
            if (~oldValueIndex) {
              collectedValues.splice(oldValueIndex, 1)
            }
          }
          if (value !== undefined) {
            const valueIndex = collectedValues.findIndex(collectedValue => collectedValue === value)
            if (!~valueIndex) {
              collectedValues.push(value)
            }
          }
          if (!bubble) return
          currentInjection = currentInjection[injectionName] || null
        }
      }
    }
  }
}
