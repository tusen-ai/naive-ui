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
      const theme = this.theme
      if (theme !== null) {
        return theme
      }
      const NThemedComponent = this.NThemedComponent
      if (
        NThemedComponent &&
        NThemedComponent.theme &&
        NThemedComponent.themeContextActivated
      ) {
        return NThemedComponent.theme
      }
      const NConfigProvider = this.NConfigProvider
      return (NConfigProvider && NConfigProvider.syntheticTheme) || null
    },
    syntheticStyle () {
      const themedStyle = this.themedStyle
      const syntheticTheme = this.syntheticTheme
      if (themedStyle && syntheticTheme && themedStyle[syntheticTheme]) {
        return themedStyle[syntheticTheme]
      }
      return null
    },
    syntheticThemeEnvironment () {
      const NConfigProvider = this.NConfigProvider
      const syntheticTheme = this.syntheticTheme
      if (syntheticTheme && NConfigProvider && NConfigProvider.inheritedThemeEnvironment) {
        return NConfigProvider.inheritedThemeEnvironment[syntheticTheme] || null
      }
    }
  }
}
