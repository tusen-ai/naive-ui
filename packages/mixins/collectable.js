export default function (
  injectionName,
  collectionProperty,
  registerProperty = 'value',
  flatten = false
) {
  return {
    computed: {
      activeInjection () {
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
    watch: {
      [registerProperty]: function (value, oldValue) {
        if (this.activeInjection) {
          this.registerValue(value, oldValue)
        }
      }
    },
    created () {
      if (this.activeInjection) {
        this.registerValue(this[registerProperty])
      }
    },
    beforeDestroy () {
      if (this.activeInjection) {
        this.registerValue(undefined, this[registerProperty])
      }
    },
    methods: {
      registerValue (value = undefined, oldValue = undefined) {
        if (this.disabledCollectable) {
          return
        }
        if (this.activeInjection) {
          const values = new Set(this.activeInjection[collectionProperty])
          if (oldValue !== undefined) {
            if (flatten && Array.isArray(value)) {
              value.forEach(registeredValue => values.delete(registeredValue))
            } else {
              values.delete(oldValue)
            }
          }
          if (value !== undefined) {
            if (flatten && Array.isArray(value)) {
              value.forEach(valueToRegister => values.add(valueToRegister))
            } else {
              values.add(value)
            }
          }
          this.activeInjection[collectionProperty] = Array.from(values)
        }
      }
    }
  }
}
