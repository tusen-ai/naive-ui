export default {
  icon: {
    type: [String, Function],
    default: null
  },
  type: {
    type: String,
    default: 'default'
  },
  content: {
    type: [String, Function],
    default: null
  },
  closable: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: null
  },
  onClose: {
    type: Function,
    default: () => {}
  }
}
