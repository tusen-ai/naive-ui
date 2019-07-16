/**
 * toggle prop active use v-model
 */
export default {
  model: {
    prop: 'active',
    event: 'input'
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deactivate () {
      console.log('deactivate')
      this.$emit('input', false)
    },
    activate () {
      console.log('activate')
      this.$emit('input', true)
    }
  }
}
