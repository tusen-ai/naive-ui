export default function createLocaleMixin (componentLocaleNamespace) {
  return {
    inject: {
      NConfigProvider: {
        default: null
      }
    },
    computed: {
      // the locale object
      globalLocale () {
        const { NConfigProvider } = this
        const { locale } = NConfigProvider
        if (locale) return locale
        const { mergedLanguage } = NConfigProvider
        const {
          $naive: { locales, fallbackLocale }
        } = this
        return locales[mergedLanguage ?? fallbackLocale]
      },
      dateFnsLocale () {
        return this.globalLocale._dateFns
      },
      locale () {
        return this.globalLocale[componentLocaleNamespace]
      }
    }
  }
}
