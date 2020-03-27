export default {
  props: {
    themeContextActivated: {
      type: Boolean,
      default: true
    }
  },
  provide () {
    return {
      NThemedComponent: this
    }
  }
}
