export default {
  type: {
    validator (value) {
      return ['default', 'success', 'info', 'warning', 'error'].includes(value)
    },
    default: 'default'
  },
  round: {
    type: Boolean,
    default: false
  },
  size: {
    validator (value) {
      return ['small', 'medium', 'large'].includes(value)
    },
    default: 'medium'
  },
  closable: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
}
