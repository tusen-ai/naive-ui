import {
  h,
  inject,
  computed,
  defineComponent,
  PropType,
  provide,
  ComputedRef,
  markRaw,
  ExtractPropTypes
} from 'vue'
import { useMemo } from 'vooks'
import { merge } from 'lodash-es'
import { hash } from 'css-render'
import { warn } from '../../_utils'
import { defaultClsPrefix, Hljs } from '../../_mixins'
import { NDateLocale, NLocale } from '../../locales'
import type {
  GlobalTheme,
  GlobalThemeOverrides,
  GlobalComponentConfig,
  GlobalIconConfig
} from './interface'
import type {
  RtlProp,
  RtlEnabledState,
  Breakpoints
} from './internal-interface'
import { configProviderInjectionKey } from './context'
import type { Katex } from './katex'

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
  katex: Object as PropType<Katex>,
  theme: Object as PropType<GlobalTheme | null>,
  themeOverrides: Object as PropType<GlobalThemeOverrides | null>,
  componentOptions: Object as PropType<GlobalComponentConfig>,
  icons: Object as PropType<GlobalIconConfig>,
  breakpoints: Object as PropType<Breakpoints>,
  preflightStyleDisabled: Boolean,
  inlineThemeDisabled: {
    type: Boolean,
    default: undefined
  },
  // deprecated
  as: {
    type: String as PropType<string | undefined>,
    validator: () => {
      warn('config-provider', '`as` is deprecated, please use `tag` instead.')
      return true
    },
    default: undefined
  }
} as const

export type ConfigProviderProps = Partial<
ExtractPropTypes<typeof configProviderProps>
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
      if (clsPrefix !== undefined) return clsPrefix
      return NConfigProvider?.mergedClsPrefixRef.value
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
          rtlInfo.peers?.forEach((peerRtlInfo) => {
            if (!(peerRtlInfo.name in rtlEnabledState)) {
              rtlEnabledState[peerRtlInfo.name] = markRaw(peerRtlInfo)
            }
          })
        }
        return rtlEnabledState
      }
    )
    const mergedBreakpointsRef = computed(() => {
      return props.breakpoints || NConfigProvider?.mergedBreakpointsRef.value
    })
    const inlineThemeDisabled =
      props.inlineThemeDisabled || NConfigProvider?.inlineThemeDisabled
    const preflightStyleDisabled =
      props.preflightStyleDisabled || NConfigProvider?.preflightStyleDisabled
    const mergedThemeHashRef = computed(() => {
      const { value: theme } = mergedThemeRef
      const { value: mergedThemeOverrides } = mergedThemeOverridesRef
      const hasThemeOverrides =
        mergedThemeOverrides && Object.keys(mergedThemeOverrides).length !== 0
      const themeName = theme?.name
      if (themeName) {
        if (hasThemeOverrides) {
          return `${themeName}-${hash(
            JSON.stringify(mergedThemeOverridesRef.value)
          )}`
        }
        return themeName
      } else {
        if (hasThemeOverrides) {
          return hash(JSON.stringify(mergedThemeOverridesRef.value))
        }
        return ''
      }
    })
    provide(configProviderInjectionKey, {
      mergedThemeHashRef,
      mergedBreakpointsRef,
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
      mergedKatexRef: computed(() => {
        const { katex } = props
        return katex === undefined
          ? NConfigProvider?.mergedKatexRef.value
          : katex
      }),
      mergedThemeRef,
      mergedThemeOverridesRef,
      inlineThemeDisabled: inlineThemeDisabled || false,
      preflightStyleDisabled: preflightStyleDisabled || false
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
        this.$slots.default?.()
      )
      : this.$slots.default?.()
  }
})
