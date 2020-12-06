import { h } from 'vue'
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import styleScheme from '../../_deprecated/style-scheme'
import style from './styles'
import { warn } from '../../_utils'

export default {
  name: 'Element',
  alias: ['El'],
  mixins: [
    configurable,
    themeable,
    withCssr(style)
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
        'n-element': true,
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
