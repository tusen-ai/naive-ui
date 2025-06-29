import type {
  CSSProperties,
  ExtractPublicPropTypes,
  PropType,
  SlotsType
} from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { TypewriterTheme } from '../styles/light'
import type { TypewriterOptions, TypewriterSlots } from './public-types'
import { NMarkdown } from 'naive-ui'
import { computed, defineComponent, h, toRef } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import { resolveSlotWithTypedProps } from '../../_utils'
import bubbleLight from '../styles/light'
import { useTypewriter } from './hooks/useTypewriter'
import style from './styles/index.cssr'

export const typewriterProps = {
  ...(useTheme.props as ThemeProps<TypewriterTheme>),
  content: {
    type: String,
    default: ''
  },
  isMarkdown: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object as PropType<TypewriterOptions>,
    default: {
      interval: 80,
      step: 1,
      initialIndex: 5
    }
  }
}

export type TypewriterProps = ExtractPublicPropTypes<typeof typewriterProps>

export default defineComponent({
  name: 'Typewriter',
  props: typewriterProps,
  slots: Object as SlotsType<TypewriterSlots>,
  setup(props) {
    const { inlineThemeDisabled, mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Typewriter',
      '-typewriter',
      style,
      bubbleLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      return {
        // next version maybe add more variables
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('Typewriter', undefined, cssVarsRef, props)
      : undefined

    const content = toRef(props, 'content')
    const { typedContent, isTyping } = useTypewriter(content, props.options)

    return {
      mergedTheme: themeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      isTyping,
      typedContent
    }
  },
  render() {
    const { mergedClsPrefix, typedContent, isTyping, isMarkdown } = this

    const effect = isTyping ? 'typing' : null

    return (
      <div
        class={[`${mergedClsPrefix}-typewriter`, this.themeClass]}
        style={this.cssVars as CSSProperties}
      >
        {resolveSlotWithTypedProps(
          this.$slots.default,
          {
            typedContent
          },
          () => [
            isMarkdown ? (
              <NMarkdown data-effect={effect} content={typedContent} />
            ) : (
              <div data-effect={effect}>
                <p>{typedContent}</p>
              </div>
            )
          ]
        )}
      </div>
    )
  }
})
