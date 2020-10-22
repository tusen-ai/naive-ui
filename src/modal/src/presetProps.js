export default {
  bodyStyle: {
    type: Object,
    default: undefined
  },
  // For preset: confirm, card
  title: {
    type: String,
    default: undefined
  },
  closable: {
    type: Boolean,
    default: true
  },
  // For preset: confirm
  negativeText: {
    type: String,
    default: undefined
  },
  positiveText: {
    type: String,
    default: undefined
  },
  content: {
    type: String,
    default: undefined
  },
  // For preset: card
  segmented: {
    type: [Boolean, Object],
    default: undefined
  },
  size: {
    type: String,
    default: undefined
  },
  bordered: {
    type: Boolean,
    default: false
  },
  // deprecated
  overlayStyle: {
    type: Object,
    default: undefined
  }
}
