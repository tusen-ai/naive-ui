import { computed, h, defineComponent, PropType } from 'vue'
import { kebabCase } from 'lodash-es'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'

/**
 * @deprecated
 */
import useLegacy from '../../config-consumer/src/use-legacy'
import { elementLight } from '../styles'
import type { ElementTheme } from '../styles'

const elementProps = {
  ...(useTheme.props as ThemeProps<ElementTheme>),
  tag: {
    type: String,
    default: 'div'
  },
  // deprecated
  onThemeChange: {
    type: Function as PropType<(theme: string | undefined) => void>,
    validator: () => {
      warn('element', '`on-theme-change` is deprecated.')
      return true
    },
    default: undefined
  },
  as: {
    type: String,
    validator: () => {
      warn('element', '`as` is deprecated, please use `tag` instead.')
      return true
    },
    default: undefined
  }
} as const

export type ElementProps = ExtractPublicPropTypes<typeof elementProps>

export default defineComponent({
  name: 'Element',
  alias: ['El'],
  props: elementProps,
  setup (props) {
    const { NConfigProvider, namespace, mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Element',
      'Element',
      undefined,
      elementLight,
      props,
      mergedClsPrefix
    )
    return {
      ...useLegacy(NConfigProvider),
      cPrefix: mergedClsPrefix,
      namespace,
      cssVars: computed(() => {
        const { common } = themeRef.value
        return ((Object.keys(common) as unknown) as Array<
        keyof typeof common
        >).reduce<Record<string, string | number>>((prevValue, key) => {
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
      cPrefix,
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
          `${cPrefix}-element`,
          legacyTheme && `${cPrefix}-${legacyTheme}-theme`
        ],
        style: cssVars
      },
      ($slots.default?.({
        namespace: namespace,
        theme: legacyTheme,
        themeEnvironment: legacyThemeEnvironment,
        styleScheme: legacyStyleScheme
      }) || null) as any
    )
  }
})
