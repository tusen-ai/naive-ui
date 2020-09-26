import { h } from 'vue'
import themeable from '../../_mixins/themeable'
import { getSlot } from '../../_utils/vue'
import { warn } from '../../_utils/naive/warn'

export default {
  name: 'ConfigProvider',
  mixins: [
    themeable
  ],
  provide () {
    return {
      NConfigProvider: this
    }
  },
  inject: {
    NConfigProvider: {
      default: null
    }
  },
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    abstract: {
      type: Boolean,
      default: false
    },
    namespace: {
      type: String,
      default: null
    },
    themeEnvironment: {
      type: Object,
      default: null
    },
    themeEnvironments: {
      type: Object,
      default: null
    },
    language: {
      type: String,
      default: null
    },
    lang: {
      type: String,
      default: null
    },
    // deprecated
    as: {
      validator () {
        warn('config-provider', '`as` is deprecated, please use `tag` instead.')
        return true
      },
      default: undefined
    }
  },
  computed: {
    compitableThemeEnvironments () {
      return this.themeEnvironments || this.themeEnvironment
    },
    inheritedThemeEnvironments () {
      const { NConfigProvider, compitableThemeEnvironments } = this
      return compitableThemeEnvironments || (NConfigProvider ? NConfigProvider.inheritedThemeEnvironments : null)
    },
    inheritedNamespace () {
      const {
        namespace,
        NConfigProvider
      } = this
      return namespace || (NConfigProvider ? NConfigProvider.inheritedNamespace : null)
    },
    inheritedLanguage () {
      const {
        NConfigProvider,
        language,
        lang
      } = this
      return (language || lang) || (NConfigProvider ? NConfigProvider.inheritedLanguage : null)
    }
  },
  render () {
    return !this.abstract ? h(this.as || this.tag, {
      class: [
        'n-config-provider',
        {
          [`n-${this.theme}-theme`]: this.theme
        }
      ],
      style: this.syntheticStyle
    },
    getSlot(this))
      : getSlot(this)
  }
}
