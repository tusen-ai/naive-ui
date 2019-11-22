export default {
  props: {
    theme: {
      type: String,
      default: null
    },
    themedStyle: {
      type: Object,
      default: null
    }
  },
  computed: {
    synthesizedTheme () {
      if (this.theme !== null) {
        return this.theme
      } else {
        return (this.NApp && this.NApp.synthesizedTheme) || null
      }
    },
    synthesizedStyle () {
      if (this.themedStyle && this.synthesizedTheme && this.themedStyle[this.synthesizedTheme]) {
        return this.themedStyle[this.synthesizedTheme]
      }
      return null
    }
  }
}
