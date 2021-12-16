import {
  h,
  renderSlot,
  defineComponent,
  computed,
  PropType,
  CSSProperties
} from 'vue'
import { useCompitable } from 'vooks'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, createKey } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/text.cssr'

const textProps = {
  ...(useTheme.props as ThemeProps<TypographyTheme>),
  code: Boolean,
  type: {
    type: String,
    default: 'default'
  },
  delete: Boolean,
  strong: Boolean,
  italic: Boolean,
  underline: Boolean,
  depth: [String, Number] as PropType<1 | 2 | 3 | '1' | '2' | '3'>,
  tag: String,
  // deprecated
  as: {
    type: String,
    validator: () => {
      if (__DEV__) {
        warn('text', '`as` is deprecated, please use `tag` instead.')
      }
      return true
    },
    default: undefined
  }
} as const

export type TextProps = ExtractPublicPropTypes<typeof textProps>

export default defineComponent({
  name: 'Text',
  props: textProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Typography',
      'Text',
      style,
      typographyLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      compitableTag: useCompitable(props, ['as', 'tag']),
      cssVars: computed(() => {
        const { depth, type } = props
        const textColorKey =
          type === 'default'
            ? depth === undefined
              ? 'textColor'
              : `textColor${depth}Depth`
            : createKey('textColor', type)
        const {
          common: { fontWeightStrong, fontFamilyMono, cubicBezierEaseInOut },
          self: {
            codeTextColor,
            codeBorderRadius,
            codeColor,
            codeBorder,
            [textColorKey as 'textColor']: textColor
          }
        } = themeRef.value
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-text-color': textColor,
          '--n-font-weight-strong': fontWeightStrong,
          '--n-font-famliy-mono': fontFamilyMono,
          '--n-code-border-radius': codeBorderRadius,
          '--n-code-text-color': codeTextColor,
          '--n-code-color': codeColor,
          '--n-code-border': codeBorder
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    const textClass = [
      `${mergedClsPrefix}-text`,
      {
        [`${mergedClsPrefix}-text--code`]: this.code,
        [`${mergedClsPrefix}-text--delete`]: this.delete,
        [`${mergedClsPrefix}-text--strong`]: this.strong,
        [`${mergedClsPrefix}-text--italic`]: this.italic,
        [`${mergedClsPrefix}-text--underline`]: this.underline
      }
    ]
    const defaultSlot = renderSlot(this.$slots, 'default')
    return this.code ? (
      <code class={textClass} style={this.cssVars as CSSProperties}>
        {this.delete ? <del>{defaultSlot}</del> : defaultSlot}
      </code>
    ) : this.delete ? (
      <del class={textClass} style={this.cssVars as CSSProperties}>
        {defaultSlot}
      </del>
    ) : (
      h(
        this.compitableTag || 'span',
        { class: textClass, style: this.cssVars },
        defaultSlot
      )
    )
  }
})
