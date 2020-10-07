import { h } from 'vue'
import {
  configurable,
  themeable
} from '../../_mixins'
import styleScheme from '../../_deprecated/style-scheme'
import { warn } from '../../_utils/naive/warn'

export default {
  name: 'Element',
  mixins: [
    configurable,
    themeable
  ],
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    onThemeChange: {
      type: Function,
      default: undefined
    },
    // deprecated
    as: {
      validator () {
        warn('element', '`as` is deprecated, please use `tag` instead.')
        return true
      },
      default: undefined
    }
  },
  watch: {
    mergedTheme: function (value, oldValue) {
      const {
        onThemeChange
      } = this
      if (onThemeChange) onThemeChange(value, oldValue)
    }
  },
  render () {
    const {
      as,
      tag,
      mergedTheme,
      NConfigProvider,
      mergedThemeEnvironment,
      $slots
    } = this
    return h(as || tag, {
      class: {
        [`n-${mergedTheme}-theme`]: mergedTheme
      }
    }, ($slots.default && $slots.default({
      theme: mergedTheme,
      namespace: NConfigProvider ? NConfigProvider.inheritedNamespace : null,
      themeEnvironment: mergedThemeEnvironment,
      styleScheme: mergedTheme ? styleScheme[mergedTheme] : null
    })) || null)
  }
}
