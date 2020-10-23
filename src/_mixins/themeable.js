export default {
  props: {
    theme: {
      type: String,
      default: undefined
    },
    themedStyle: {
      type: Object,
      default: undefined
    }
  },
  computed: {
    mergedTheme () {
      const { theme } = this
      if (theme !== null && theme !== undefined) {
        return theme
      }
      const NConfigProvider = this.NConfigProvider
      return (NConfigProvider && NConfigProvider.mergedTheme) || null
    },
    mergedStyle () {
      const { themedStyle } = this
      if (themedStyle) {
        const {
          mergedTheme,
          $naive: {
            fallbackTheme
          }
        } = this
        return themedStyle[mergedTheme || fallbackTheme]
      }
      return null
    },
    mergedThemeEnvironment () {
      const { NConfigProvider } = this
      if (NConfigProvider) {
        const {
          inheritedThemeEnvironments
        } = NConfigProvider
        if (inheritedThemeEnvironments) {
          const {
            mergedTheme,
            $naive: {
              fallbackTheme
            }
          } = this
          return inheritedThemeEnvironments[mergedTheme || fallbackTheme] || null
        }
      }
      return null
    }
  }
}
