import { computed, h, defineComponent } from 'vue'
import { kebabCase } from 'lodash-es'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { elementLight } from '../styles'
import type { ElementTheme } from '../styles'

const elementProps = {
  ...(useTheme.props as ThemeProps<ElementTheme>),
  tag: {
    type: String,
    default: 'div'
  }
} as const

export type ElementProps = ExtractPublicPropTypes<typeof elementProps>

export default defineComponent({
  name: 'Element',
  alias: ['El'],
  props: elementProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Element',
      '-element',
      undefined,
      elementLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: computed(() => {
        const { common } = themeRef.value
        return (
          Object.keys(common) as unknown as Array<keyof typeof common>
        ).reduce<Record<string, string | number>>((prevValue, key) => {
          prevValue[`--${kebabCase(key)}`] = common[key]
          return prevValue
        }, {})
      })
    }
  },
  render () {
    const { tag, mergedClsPrefix, cssVars, $slots } = this
    return h(
      tag,
      {
        role: 'none',
        class: `${mergedClsPrefix}-element`,
        style: cssVars
      },
      $slots.default?.()
    )
  }
})
