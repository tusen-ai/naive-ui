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
  inject: {
    NThemedComponent: {
      default: null
    }
  },
  computed: {
    synthesizedTheme () {
      if (this.theme !== null) {
        return this.theme
      } else if (this.NThemedComponent && this.NThemedComponent.synthesizedTheme) {
        return this.NThemedComponent.synthesizedTheme
      } else {
        return (this.NConfigProvider && this.NConfigProvider.synthesizedTheme) || null
      }
    },
    synthesizedStyle () {
      if (this.themedStyle && this.synthesizedTheme && this.themedStyle[this.synthesizedTheme]) {
        return this.themedStyle[this.synthesizedTheme]
      }
      return null
    },
    synthesizedThemeEnvironment () {
      if (this.synthesizedTheme && this.NConfigProvider && this.NConfigProvider.themeEnvironment) {
        return this.NConfigProvider.themeEnvironment[this.synthesizedTheme] || null
      }
    }
  }
}
