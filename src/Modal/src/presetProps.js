export default {
  bodyStyle: {
    type: [Object, String],
    default: null
  },
  // For preset: confirm, card
  title: {
    type: String,
    default: 'title'
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
    default: undefined
  }
}
