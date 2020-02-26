function getTranslation (locales, fallbackLocale, language, namespace, key) {
  const locale = locales[language]
  if (locale) {
    return locale[namespace][key]
  } else {
    return fallbackLocale[namespace][key]
  }
}

function getTranslationNamespace (locales, fallbackLocale, language, namespace) {
  const locale = locales[language]
  if (locale) {
    return locale[namespace]
  } else {
    return fallbackLocale[namespace]
  }
}

function getDateFns (locales, fallbackLocale, language) {
  const locale = locales[language]
  if (locale) {
    return locale._dateFns
  } else {
    return fallbackLocale._dateFns
  }
}

export default function createLocaleMixin (componentLocaleNamespace) {
  return {
    inject: {
      NConfigProvider: {
        default: null
      }
    },
    computed: {
      locale () {
        if (this.NConfigProvider) {
          return this.NConfigProvider.inheritedLanguage
        } else {
          return this.$naive.fallbackLocale
        }
      },
      dateFnsLocale () {
        let language = null
        if (this.NConfigProvider) {
          language = this.NConfigProvider.inheritedLanguage
        }
        return getDateFns(
          this.$naive.locales,
          this.$naive.fallbackLocale,
          language
        )
      },
      localeNamespace () {
        return this.tns(componentLocaleNamespace)
      }
    },
    methods: {
      t (namespace, key) {
        let language = null
        if (this.NConfigProvider) {
          language = this.NConfigProvider.inheritedLanguage
        }
        return getTranslation(
          this.$naive.locales,
          this.$naive.fallbackLocale,
          language,
          namespace,
          key
        )
      },
      tns (namespace) {
        let language = null
        if (this.NConfigProvider) {
          language = this.NConfigProvider.inheritedLanguage
        }
        return getTranslationNamespace(
          this.$naive.locales,
          this.$naive.fallbackLocale,
          language,
          namespace
        )
      }
    }
  }
}
