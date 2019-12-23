function getTranslation (locales, fallbackLocale, language, componentName, key) {
  const locale = locales[language]
  if (locale) {
    return locale[componentName][key]
  } else {
    return fallbackLocale[componentName][key]
  }
}

export default {
  inject: {
    NConfigProvider: {
      default: null
    }
  },
  methods: {
    t (key) {
      const componentName = this.$options.name
      const language = this.NConfigProvider.inheritedLanguage
      return getTranslation(
        this.$naive.locales,
        this.$naive.fallbackLocale,
        language,
        componentName,
        key
      )
    }
  }
}
