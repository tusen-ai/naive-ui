export default function (
  inject,
  collectionProperty,
  registerProperty = 'value'
) {
  return {
    watch: {
      [registerProperty]: function (value, oldValue) {
        if (this[inject]) {
          this.registerValue(value, oldValue)
        }
      }
    },
    created () {
      if (this[inject]) {
        this.registerValue(this[registerProperty])
      }
    },
    beforeDestroy () {
      if (this[inject]) {
        this.registerValue(undefined, this[registerProperty])
      }
    },
    methods: {
      registerValue (value = undefined, oldValue = undefined) {
        if (this[inject]) {
          const values = new Set(this[inject][collectionProperty])
          if (oldValue !== undefined) values.delete(oldValue)
          if (value !== undefined) values.add(value)
          this[inject][collectionProperty] = Array.from(values)
        }
      }
    }
  }
}
