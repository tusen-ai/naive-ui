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
    type: [String, Function],
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
