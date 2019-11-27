export default function (
  inject,
  collectionProperty,
  registerProperty = 'value'
) {
  return {
    computed: {
      activeInjection () {
        if (Array.isArray(inject)) {
          const activeInjectionIndex = inject.findIndex(key => this[key])
          if (~activeInjectionIndex) {
            return this[inject[activeInjectionIndex]]
          }
        } else {
          return this[inject]
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
        if (this.activeInjection) {
          const values = new Set(this.activeInjection[collectionProperty])
          if (oldValue !== undefined) values.delete(oldValue)
          if (value !== undefined) values.add(value)
          this.activeInjection[collectionProperty] = Array.from(values)
          // console.log(this.activeInjection[collectionProperty])
        }
      }
    }
  }
}
