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
import type { Hljs } from '../../_mixins'
import {
  ConfigProviderInjection,
  GlobalTheme,
  GlobalThemeOverrides
} from './interface'
import { NaiveDateLocale, NaiveLocale } from '../../locales'

export default defineComponent({
  name: 'ConfigProvider',
  alias: ['App'],
  props: {
    abstract: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined
    },
    locale: Object as PropType<NaiveLocale>,
    dateLocale: Object as PropType<NaiveDateLocale>,
    namespace: String,
    tag: {
      type: String,
      default: 'div'
    },
    hljs: Object as PropType<Hljs>,
    // wip, unstable
    unstableTheme: Object as PropType<GlobalTheme>,
    unstableThemeOverrides: Object as PropType<GlobalThemeOverrides>,
    // deprecated
    theme: String,
    language: String,
    lang: String,
    as: {
      type: Object as PropType<string | undefined>,
      validator: () => {
        warn('config-provider', '`as` is deprecated, please use `tag` instead.')
        return true
      },
      default: undefined
    },
    themeEnvironment: {
      type: Object as PropType<unknown | undefined>,
      validator: () => {
        warn('config-provider', '`theme-environment` is deprecated.')
        return true
      },
      default: undefined
    },
    themeEnvironments: {
      type: Object as PropType<unknown | undefined>,
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
            ? NConfigProvider?.mergedDateLocale
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
