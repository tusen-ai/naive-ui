import { h } from 'vue'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import styleScheme from '../../_utils/naive/styleScheme'
import { warn } from '../../_utils/naive/warn'

export default {
  name: 'Element',
  mixins: [
    withapp,
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
