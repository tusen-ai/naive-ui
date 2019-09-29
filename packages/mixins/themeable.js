export default {
  props: {
    theme: {
      type: String,
      default: null
    }
  },
  computed: {
    synthesizedTheme () {
      if (this.theme !== null) {
        return this.theme
      } else {
        return (this.NApp && this.NApp.theme) || null
      }
    }
  }
}
