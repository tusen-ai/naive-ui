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
    mergedTheme () {
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
      return (NConfigProvider && NConfigProvider.mergedTheme) || null
    },
    syntheticStyle () {
      const themedStyle = this.themedStyle
      const mergedTheme = this.mergedTheme
      if (themedStyle && mergedTheme && themedStyle[mergedTheme]) {
        return themedStyle[mergedTheme]
      }
      return null
    },
    mergedThemeEnvironment () {
      const NConfigProvider = this.NConfigProvider
      const mergedTheme = this.mergedTheme
      if (mergedTheme && NConfigProvider && NConfigProvider.inheritedThemeEnvironments) {
        return NConfigProvider.inheritedThemeEnvironments[mergedTheme] || null
      }
    }
  }
}
