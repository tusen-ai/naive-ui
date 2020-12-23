import { h, inject, computed } from 'vue'
import { useMemo } from 'vooks'
import { warn, getSlot } from '../../_utils'

function createStyleMap (styles) {
  if (!styles) return undefined
  return styles.reduce((map, style) => {
    const { theme, name } = style
    if (!map[theme]) map[theme] = {}
    map[theme][name] = style
    return map
  }, {})
}

export default {
  name: 'ConfigProvider',
  alias: ['App'],
  provide () {
    return {
      NConfigProvider: this
    }
  },
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
      type: Object,
      default: undefined
    },
    namespace: {
      type: String,
      default: undefined
    },
    styles: {
      type: Array,
      default: undefined
    },
    tag: {
      type: String,
      default: 'div'
    },
    theme: {
      type: String,
      default: undefined
    },
    // deprecated
    language: {
      type: String,
      default: undefined
    },
    lang: {
      type: String,
      default: undefined
    },
    as: {
      validator () {
        warn('config-provider', '`as` is deprecated, please use `tag` instead.')
        return true
      },
      default: undefined
    },
    themeEnvironment: {
      validator () {
        warn('config-provider', '`theme-environment` is deprecated.')
        return true
      },
      default: undefined
    },
    themeEnvironments: {
      validator () {
        warn('config-provider', '`theme-environments` is deprecated.')
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const NConfigProvider = inject('NConfigProvider', null)
    return {
      mergedBordered: useMemo(() => {
        return props.bordered ?? NConfigProvider?.mergedBordered
      }),
      mergedTheme: useMemo(() => {
        return props.theme ?? NConfigProvider?.mergedTheme
      }),
      mergedNamespace: useMemo(() => {
        return props.namespace ?? NConfigProvider?.mergedNamespace
      }),
      mergedLocale: computed(() => {
        return props.locale ?? NConfigProvider?.mergedLocale
      }),
      mergedStyles: computed(() => {
        // TODO, merged styles together
        return createStyleMap(props.styles) ?? NConfigProvider?.mergedStyles
      }),
      // deprecated
      mergedLanguage: useMemo(() => {
        return props.language ?? props.lang ?? NConfigProvider?.mergedLanguage
      }),
      mergedThemeEnvironments: computed(() => {
        return (
          props.themeEnvironments ??
          props.themeEnvironment ??
          NConfigProvider?.mergedThemeEnvironments
        )
      })
    }
  },
  render () {
    return !this.abstract
      ? h(
        this.as || this.tag,
        {
          class: [
            'n-config-provider',
            {
              [`n-${this.theme}-theme`]: this.theme
            }
          ]
        },
        getSlot(this)
      )
      : getSlot(this)
  }
}
