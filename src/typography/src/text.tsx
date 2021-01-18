import {
  h,
  renderSlot,
  defineComponent,
  computed,
  PropType,
  CSSProperties
} from 'vue'
import { useCompitable } from 'vooks'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, createKey } from '../../_utils'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/text.cssr'

export default defineComponent({
  name: 'Text',
  props: {
    ...(useTheme.props as ThemeProps<TypographyTheme>),
    code: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    delete: {
      type: Boolean,
      default: false
    },
    strong: {
      type: Boolean,
      default: false
    },
    italic: {
      type: Boolean,
      default: false
    },
    underline: {
      type: Boolean,
      default: false
    },
    depth: {
      type: [String, Number] as PropType<
      1 | 2 | 3 | '1' | '2' | '3' | undefined
      >,
      default: undefined
    },
    tag: {
      type: String,
      default: undefined
    },
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
  },
  setup (props) {
    const themeRef = useTheme(
      'Typography',
      'Text',
      style,
      typographyLight,
      props
    )
    return {
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
          common: { fontWeightStrong, fontFamilyMono },
          self: {
            codeTextColor,
            codeBorderRadius,
            codeColor,
            codeBorder,
            [textColorKey as 'textColor']: textColor
          }
        } = themeRef.value
        return {
          '--text-color': textColor,
          '--font-weight-strong': fontWeightStrong,
          '--font-famliy-mono': fontFamilyMono,
          '--code-border-radius': codeBorderRadius,
          '--code-text-color': codeTextColor,
          '--code-color': codeColor,
          '--code-border': codeBorder
        }
      })
    }
  },
  render () {
    const textClass = [
      'n-text',
      {
        'n-text--code': this.code,
        'n-text--delete': this.delete,
        'n-text--strong': this.strong,
        'n-text--italic': this.italic,
        'n-text--underline': this.underline
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
