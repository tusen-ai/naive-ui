<script>
import themeable from '../../../mixins/themeable'

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
    }
  },
  computed: {
    inheritedThemeEnvironment () {
      return this.themeEnvironment || (this.NConfigProvider ? this.NConfigProvider.inheritedThemeEnvironment : null)
    },
    inheritedNamespace () {
      return this.namespace || (this.NConfigProvider ? this.NConfigProvider.inheritedNamespace : null)
    }
  },
  render (h) {
    const defaultSlot = this.$scopedSlots.default ? this.$scopedSlots.default() : []
    if (this.transparent) {
      if (defaultSlot.length > 1) {
        console.warn('[naive-ui/config-provider]: Config provider only takes single child node in transparent mode.')
      }
    }
    return !this.transparent ? h(this.as, {
      staticClass: 'n-config-provider',
      class: {
        [`n-config-provider--${this.theme}-theme`]: this.theme,
        [`n-${this.theme}-theme`]: this.theme
      },
      style: this.synthesizedStyle
    },
    defaultSlot)
      : defaultSlot[0]
  }
}
</script>
