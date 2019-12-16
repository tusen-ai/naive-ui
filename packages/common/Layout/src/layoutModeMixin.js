export default {
  inject: {
    NLayout: {
      default: null
    }
  },
  props: {
    mode: {
      default: 'default',
      validator (value) {
        return ['default', 'absolute'].includes(value)
      }
    }
  }
}
