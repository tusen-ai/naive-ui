export default {
  inject: {
    NLayout: {
      default: null
    }
  },
  props: {
    position: {
      default: 'static',
      validator (value) {
        return ['static', 'absolute'].includes(value)
      }
    }
  }
}
