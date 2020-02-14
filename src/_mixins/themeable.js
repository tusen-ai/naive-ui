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
    syntheticTheme () {
      if (this.theme !== null) {
        return this.theme
      } else if (this.NThemedComponent && this.NThemedComponent.theme) {
        return this.NThemedComponent.theme
      } else {
        return (this.NConfigProvider && this.NConfigProvider.syntheticTheme) || null
      }
    },
    syntheticStyle () {
      if (this.themedStyle && this.syntheticTheme && this.themedStyle[this.syntheticTheme]) {
        return this.themedStyle[this.syntheticTheme]
      }
      return null
    },
    syntheticThemeEnvironment () {
      if (this.syntheticTheme && this.NConfigProvider && this.NConfigProvider.inheritedThemeEnvironment) {
        return this.NConfigProvider.inheritedThemeEnvironment[this.syntheticTheme] || null
      }
    }
  }
}
