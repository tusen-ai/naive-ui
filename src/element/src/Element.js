import { computed, h, defineComponent } from 'vue'
import { kebabCase } from 'lodash-es'
import { useConfig, useTheme } from '../../_mixins'
import { warn } from '../../_utils'

/**
 * @deprecated
 */
import useLegacy from '../../config-consumer/src/use-legacy'
import { elementLight } from '../styles'

export default defineComponent({
  name: 'Element',
  alias: ['El'],
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
  setup (props) {
    const themeRef = useTheme('Element', 'Element', null, elementLight, props)
    return {
      ...useLegacy(props),
      ...useConfig(props),
      cssVars: computed(() => {
        const { common } = themeRef.value
        return Object.keys(common).reduce((prevValue, key) => {
          prevValue[`--${kebabCase(key)}`] = common[key]
          return prevValue
        }, {})
      })
    }
  },
  render () {
    const {
      as,
      tag,
      namespace,
      $slots,
      cssVars,
      // deprecated
      legacyTheme,
      legacyThemeEnvironment,
      legacyStyleScheme
    } = this
    return h(
      as || tag,
      {
        class: [
          'n-element',
          {
            [`n-${legacyTheme}-theme`]: legacyTheme
          }
        ],
        style: cssVars
      },
      ($slots.default &&
        $slots.default({
          namespace: namespace,
          theme: legacyTheme,
          themeEnvironment: legacyThemeEnvironment,
          styleScheme: legacyStyleScheme
        })) ||
        null
    )
  }
})
