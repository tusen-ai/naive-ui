/**
 * toggle prop active use v-model
 */
export default {
  model: {
    prop: 'active',
    event: 'setactive'
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deactivate () {
      // console.log('deactivate')
      this.$emit('setactive', false)
    },
    activate () {
      // console.log('activate')
      this.$emit('setactive', true)
    },
    toggle () {
      if (this.active) this.deactivate()
      else this.activate()
    }
  }
}
