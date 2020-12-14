export default {
  icon: {
    type: [String, Function],
    default: undefined
  },
  type: {
    type: String,
    default: 'default'
  },
  content: {
    validator () {
      return true
    },
    default: undefined
  },
  closable: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: undefined
  },
  onClose: {
    type: Function,
    default: () => {}
  }
}
