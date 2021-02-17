import {
  h,
  inject,
  computed,
  defineComponent,
  PropType,
  provide,
  reactive,
  onBeforeMount
} from 'vue'
import { useMemo } from 'vooks'
import { warn, getSlot } from '../../_utils'
import type { Hljs } from '../../_mixins'
import {
  ConfigProviderInjection,
  GlobalTheme,
  GlobalThemeOverrides,
  ComponentProps,
  Icons
} from './interface'
import { NDateLocale, NLocale } from '../../locales'

export const configProviderProps = {
  abstract: {
    type: Boolean,
    default: false
  },
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  locale: Object as PropType<NLocale | null>,
  dateLocale: Object as PropType<NDateLocale | null>,
  namespace: String,
  tag: {
    type: String,
    default: 'div'
  },
  hljs: Object as PropType<Hljs>,
  theme: Object as PropType<GlobalTheme | null>,
  themeOverrides: Object as PropType<GlobalThemeOverrides | null>,
  componentOptions: Object as PropType<ComponentProps>,
  icons: Object as PropType<Icons>,
  onBeforeMount: Function,
  // deprecated
  legacyTheme: String,
  language: {
    type: String as PropType<string | undefined>,
    validator: () => {
      warn(
        'config-provider',
        '`language` is deprecated, please use `locale` instead.'
      )
      return true
    },
    default: undefined
  },
  lang: {
    type: String as PropType<string | undefined>,
    validator: () => {
      warn(
        'config-provider',
        '`lang` is deprecated, please use `locale` instead.'
      )
      return true
    },
    default: undefined
  },
  as: {
    type: String as PropType<string | undefined>,
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
} as const

export default defineComponent({
  name: 'ConfigProvider',
  alias: ['App'],
  props: configProviderProps,
  setup (props) {
    const NConfigProvider = inject<ConfigProviderInjection | null>(
      'NConfigProvider',
      null
    )
    const mergedUnstableThemeRef = computed(() => {
      const { theme } = props
      if (theme === null) return undefined
      return theme === undefined ? NConfigProvider?.mergedUnstableTheme : theme
    })
    const mergedUnstableThemeOverridesRef = computed(() => {
      const { themeOverrides } = props
      if (themeOverrides === null) return undefined
      return themeOverrides === undefined
        ? NConfigProvider?.mergedUnstableThemeOverrides
        : themeOverrides
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
    const mergedIconsRef = computed(() => {
      const { icons } = props
      return icons === undefined ? NConfigProvider?.mergedIcons : icons
    })
    const mergedComponentPropsRef = computed(() => {
      const { componentOptions } = props
      if (componentOptions !== undefined) return componentOptions
      return NConfigProvider?.mergedComponentProps
    })
    onBeforeMount(() => {
      const { onBeforeMount } = props
      onBeforeMount?.()
    })
    provide<ConfigProviderInjection>(
      'NConfigProvider',
      reactive({
        mergedIcons: mergedIconsRef,
        mergedComponentProps: mergedComponentPropsRef,
        mergedBordered: mergedBorderedRef,
        mergedNamespace: mergedNamespaceRef,
        mergedLocale: computed(() => {
          const { locale } = props
          if (locale === null) return undefined
          return locale === undefined ? NConfigProvider?.mergedLocale : locale
        }),
        mergedDateLocale: computed(() => {
          const { dateLocale } = props
          if (dateLocale === null) return undefined
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
          const { legacyTheme } = props
          return legacyTheme === undefined
            ? NConfigProvider?.mergedTheme
            : legacyTheme
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
