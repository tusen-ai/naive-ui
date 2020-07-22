<script>
import themeable from '../../_mixins/themeable'

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
    as: {
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
      validator (value) {
        return ['zh-CN', 'en-US'].includes(value)
      },
      default: null
    },
    lang: {
      validator (value) {
        return ['zh-CN', 'en-US'].includes(value)
      },
      default: null
    }
  },
  computed: {
    adpatedThemeEnvironments () {
      return this.themeEnvironments || this.themeEnvironment
    },
    inheritedThemeEnvironments () {
      const NConfigProvider = this.NConfigProvider
      return this.adpatedThemeEnvironments || (NConfigProvider ? NConfigProvider.inheritedThemeEnvironments : null)
    },
    inheritedNamespace () {
      return this.namespace || (this.NConfigProvider ? this.NConfigProvider.inheritedNamespace : null)
    },
    inheritedLanguage () {
      const language = this.language || this.lang
      return language || (this.NConfigProvider ? this.NConfigProvider.inheritedLanguage : null)
    }
  },
  render (h) {
    const defaultSlot = this.$scopedSlots.default ? this.$scopedSlots.default() : []
    if (this.abstract) {
      if (defaultSlot.length > 1) {
        console.error(
          '[naive-ui/config-provider]: `n-config-provider` only takes single child node when `abstract` prop is `true`. If multiple child nodes are set, only the first one will be rendered.'
        )
      }
    }
    return !this.abstract ? h(this.as, {
      staticClass: 'n-config-provider',
      class: {
        [`n-${this.theme}-theme`]: this.theme
      },
      style: this.syntheticStyle
    },
    defaultSlot)
      : defaultSlot[0]
  }
}
</script>
