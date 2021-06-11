import {
  h,
  inject,
  computed,
  defineComponent,
  PropType,
  provide,
  InjectionKey,
  renderSlot,
  ComputedRef,
  markRaw
} from 'vue'
import { useMemo } from 'vooks'
import { merge } from 'lodash-es'
import { ExtractPublicPropTypes, warn } from '../../_utils'
import { defaultClsPrefix, Hljs } from '../../_mixins'
import type {
  GlobalTheme,
  GlobalThemeOverrides,
  GlobalComponentConfig,
  GlobalIconConfig
} from './interface'
import type {
  ConfigProviderInjection,
  RtlProp,
  RtlEnabledState
} from './internal-interface'
import { NDateLocale, NLocale } from '../../locales'

export const configProviderInjectionKey: InjectionKey<ConfigProviderInjection> =
  Symbol('configProviderInjection')

export const configProviderProps = {
  abstract: Boolean,
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  clsPrefix: String,
  locale: Object as PropType<NLocale | null>,
  dateLocale: Object as PropType<NDateLocale | null>,
  namespace: String,
  rtl: Array as PropType<RtlProp>,
  tag: {
    type: String,
    default: 'div'
  },
  hljs: Object as PropType<Hljs>,
  theme: Object as PropType<GlobalTheme | null>,
  themeOverrides: Object as PropType<GlobalThemeOverrides | null>,
  componentOptions: Object as PropType<GlobalComponentConfig>,
  icons: Object as PropType<GlobalIconConfig>,
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

export type ConfigProviderProps = ExtractPublicPropTypes<
  typeof configProviderProps
>

export default defineComponent({
  name: 'ConfigProvider',
  alias: ['App'],
  props: configProviderProps,
  setup (props) {
    const NConfigProvider = inject(configProviderInjectionKey, null)
    const mergedThemeRef = computed(() => {
      const { theme } = props
      if (theme === null) return undefined
      const inheritedTheme = NConfigProvider?.mergedThemeRef.value
      return theme === undefined
        ? inheritedTheme
        : inheritedTheme === undefined
          ? theme
          : Object.assign({}, inheritedTheme, theme)
    })
    const mergedThemeOverridesRef = computed(() => {
      const { themeOverrides } = props
      // stop inheriting themeOverrides
      if (themeOverrides === null) return undefined
      // use inherited themeOverrides
      if (themeOverrides === undefined) {
        return NConfigProvider?.mergedThemeOverridesRef.value
      } else {
        const inheritedThemeOverrides =
          NConfigProvider?.mergedThemeOverridesRef.value
        if (inheritedThemeOverrides === undefined) {
          // no inherited, use self overrides
          return themeOverrides
        } else {
          // merge overrides
          return merge({}, inheritedThemeOverrides, themeOverrides)
        }
      }
    })
    const mergedNamespaceRef = useMemo(() => {
      const { namespace } = props
      return namespace === undefined
        ? NConfigProvider?.mergedNamespaceRef.value
        : namespace
    })
    const mergedBorderedRef = useMemo(() => {
      const { bordered } = props
      return bordered === undefined
        ? NConfigProvider?.mergedBorderedRef.value
        : bordered
    })
    const mergedIconsRef = computed(() => {
      const { icons } = props
      return icons === undefined ? NConfigProvider?.mergedIconsRef.value : icons
    })
    const mergedComponentPropsRef = computed(() => {
      const { componentOptions } = props
      if (componentOptions !== undefined) return componentOptions
      return NConfigProvider?.mergedComponentPropsRef.value
    })
    const mergedClsPrefixRef = computed(() => {
      const { clsPrefix } = props
      return NConfigProvider?.mergedClsPrefixRef.value ?? clsPrefix
    })
    const mergedRtlRef: ComputedRef<RtlEnabledState | undefined> = computed(
      () => {
        const { rtl } = props
        if (rtl === undefined) {
          return NConfigProvider?.mergedRtlRef.value
        }
        const rtlEnabledState: RtlEnabledState = {}
        for (const rtlInfo of rtl) {
          rtlEnabledState[rtlInfo.name] = markRaw(rtlInfo)
        }
        return rtlEnabledState
      }
    )
    provide(configProviderInjectionKey, {
      mergedRtlRef,
      mergedIconsRef,
      mergedComponentPropsRef,
      mergedBorderedRef,
      mergedNamespaceRef,
      mergedClsPrefixRef,
      mergedLocaleRef: computed(() => {
        const { locale } = props
        if (locale === null) return undefined
        return locale === undefined
          ? NConfigProvider?.mergedLocaleRef.value
          : locale
      }),
      mergedDateLocaleRef: computed(() => {
        const { dateLocale } = props
        if (dateLocale === null) return undefined
        return dateLocale === undefined
          ? NConfigProvider?.mergedDateLocaleRef.value
          : dateLocale
      }),
      mergedHljsRef: computed(() => {
        const { hljs } = props
        return hljs === undefined ? NConfigProvider?.mergedHljsRef.value : hljs
      }),
      mergedThemeRef,
      mergedThemeOverridesRef,
      // deprecated
      mergedLegacyThemeRef: useMemo(() => {
        const { legacyTheme } = props
        return legacyTheme === undefined
          ? NConfigProvider?.mergedLegacyThemeRef.value
          : legacyTheme
      }),
      mergedLanguageRef: useMemo(() => {
        const { language, lang } = props
        return language === undefined
          ? lang === undefined
            ? NConfigProvider?.mergedLanguageRef.value
            : lang
          : language
      }),
      mergedThemeEnvironmentsRef: computed(() => {
        const { themeEnvironments, themeEnvironment } = props
        return themeEnvironments === undefined
          ? themeEnvironment === undefined
            ? NConfigProvider?.mergedThemeEnvironmentsRef.value
            : themeEnvironment
          : themeEnvironments
      })
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      mergedNamespace: mergedNamespaceRef,
      mergedTheme: mergedThemeRef,
      mergedThemeOverrides: mergedThemeOverridesRef
    }
  },
  render () {
    return !this.abstract
      ? h(
        this.as || this.tag,
        {
          class: `${this.mergedClsPrefix || defaultClsPrefix}-config-provider`
        },
        renderSlot(this.$slots, 'default')
      )
      : renderSlot(this.$slots, 'default')
  }
})
