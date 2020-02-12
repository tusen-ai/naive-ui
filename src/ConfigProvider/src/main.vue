<script>
import themeable from '../../_mixins/themeable'

export default {
  name: 'NConfigProvider',
  mixins: [themeable],
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
    transparent: {
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
    inheritedThemeEnvironment () {
      return this.themeEnvironment || (this.NConfigProvider ? this.NConfigProvider.inheritedThemeEnvironment : null)
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
    if (this.transparent) {
      if (defaultSlot.length > 1) {
        console.error(
          '[naive-ui/config-provider]: `n-config-provider` only takes single child node when `transparent` prop is `true`. If multiple child nodes are set, only the first one will be rendered.'
        )
      }
    }
    return !this.transparent ? h(this.as, {
      staticClass: 'n-config-provider',
      class: {
        [`n-${this.theme}-theme`]: this.theme
      },
      style: this.synthesizedStyle
    },
    defaultSlot)
      : defaultSlot[0]
  }
}
</script>
