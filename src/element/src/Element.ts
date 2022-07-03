import { computed, h, defineComponent } from 'vue'
import { kebabCase } from 'lodash-es'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { elementLight } from '../styles'
import type { ElementTheme } from '../styles'

export const elementProps = {
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
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Element',
      '-element',
      undefined,
      elementLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { common } = themeRef.value
      return (
        Object.keys(common) as unknown as Array<keyof typeof common>
      ).reduce<Record<string, string>>((prevValue, key) => {
        prevValue[`--${kebabCase(key)}`] = common[key]
        return prevValue
      }, {})
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('element', undefined, cssVarsRef, props)
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { tag, mergedClsPrefix, cssVars, themeClass, onRender, $slots } = this
    onRender?.()
    return h(
      tag,
      {
        role: 'none',
        class: [`${mergedClsPrefix}-element`, themeClass],
        style: cssVars
      },
      $slots.default?.()
    )
  }
})
