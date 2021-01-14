import {
  h,
  inject,
  computed,
  defineComponent,
  PropType,
  provide,
  reactive
} from 'vue'
import { useMemo } from 'vooks'
import { warn, getSlot } from '../../_utils'
import {
  Theme,
  ThemeOverrides,
  NaiveDateLocale,
  NaiveLocale,
  Hljs,
  ConfigProviderInjection
} from './interface'

export default defineComponent({
  name: 'ConfigProvider',
  alias: ['App'],
  props: {
    abstract: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: undefined
    },
    locale: {
      type: Object as PropType<NaiveLocale>,
      default: undefined
    },
    dateLocale: {
      type: Object as PropType<NaiveDateLocale>,
      default: undefined
    },
    namespace: {
      type: String,
      default: undefined
    },
    tag: {
      type: String,
      default: 'div'
    },
    hljs: {
      type: Object as PropType<Hljs>,
      default: undefined
    },
    // wip, unstable
    unstableTheme: {
      type: Object as PropType<Theme>,
      default: undefined
    },
    unstableThemeOverrides: {
      type: Object as PropType<ThemeOverrides>,
      default: undefined
    },
    // deprecated
    theme: {
      type: String,
      default: undefined
    },
    language: {
      type: String,
      default: undefined
    },
    lang: {
      type: String,
      default: undefined
    },
    as: {
      type: Object as PropType<string>,
      validator: () => {
        warn('config-provider', '`as` is deprecated, please use `tag` instead.')
        return true
      },
      default: undefined
    },
    themeEnvironment: {
      type: Object as PropType<unknown>,
      validator: () => {
        warn('config-provider', '`theme-environment` is deprecated.')
        return true
      },
      default: undefined
    },
    themeEnvironments: {
      type: Object as PropType<unknown>,
      validator: () => {
        warn('config-provider', '`theme-environments` is deprecated.')
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const NConfigProvider = inject<ConfigProviderInjection | null>(
      'NConfigProvider',
      null
    )
    const mergedUnstableThemeRef = computed(() => {
      const { unstableTheme } = props
      return unstableTheme === undefined
        ? NConfigProvider?.mergedUnstableTheme
        : unstableTheme
    })
    const mergedUnstableThemeOverridesRef = computed(() => {
      const { unstableThemeOverrides } = props
      return unstableThemeOverrides === undefined
        ? NConfigProvider?.mergedUnstableThemeOverrides
        : unstableThemeOverrides
    })
    const mergedNamespaceRef = useMemo(() => {
      const { namespace } = props
      return namespace === undefined
        ? NConfigProvider?.mergedNamespace
        : namespace
    })
    const mergedBorderedRef = useMemo(() => {
      const { bordered } = props
      return bordered === undefined ? NConfigProvider?.mergedBordered : bordered
    })
    provide<ConfigProviderInjection>(
      'NConfigProvider',
      reactive({
        mergedBordered: mergedBorderedRef,
        mergedNamespace: mergedNamespaceRef,
        mergedLocale: computed(() => {
          const { locale } = props
          return locale === undefined ? NConfigProvider?.mergedLocale : locale
        }),
        mergedDateLocale: computed(() => {
          const { dateLocale } = props
          return dateLocale === undefined
            ? NConfigProvider?.mergedLocale
            : dateLocale
        }),
        mergedHljs: computed(() => {
          const { hljs } = props
          return hljs === undefined ? NConfigProvider?.mergedHljs : hljs
        }),
        // wip, unstable
        mergedUnstableTheme: mergedUnstableThemeRef,
        mergedUnstableThemeOverrides: mergedUnstableThemeOverridesRef,
        // deprecated
        mergedTheme: useMemo(() => {
          const { theme } = props
          return theme === undefined ? NConfigProvider?.mergedTheme : theme
        }),
        mergedLanguage: useMemo(() => {
          const { language, lang } = props
          return language === undefined
            ? lang === undefined
              ? NConfigProvider?.mergedLanguage
              : lang
            : language
        }),
        mergedThemeEnvironments: computed(() => {
          const { themeEnvironments, themeEnvironment } = props
          return themeEnvironments === undefined
            ? themeEnvironment === undefined
              ? NConfigProvider?.mergedThemeEnvironments
              : themeEnvironment
            : themeEnvironments
        })
      })
    )
    return {
      mergedBordered: mergedBorderedRef,
      mergedNamespace: mergedNamespaceRef,
      mergedUnstableTheme: mergedUnstableThemeRef,
      mergedUnstableThemeOverrides: mergedUnstableThemeOverridesRef
    }
  },
  render () {
    return !this.abstract
      ? h(
        this.as || this.tag,
        {
          class: ['n-config-provider']
        },
        getSlot(this)
      )
      : getSlot(this)
  }
})
