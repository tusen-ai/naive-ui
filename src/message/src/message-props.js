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
  onClose: {
    type: Function,
    default: () => {}
  }
}
