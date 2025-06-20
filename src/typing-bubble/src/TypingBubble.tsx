import type { CSSProperties } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { TypingBubbleTheme } from '../styles/light'
import { NMarkdown } from 'naive-ui'
import { computed, defineComponent, h } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import bubbleLight from '../styles/light'
import { useTypewriter } from './hooks/useTypewriter'
import { TypingBubbleProps } from './public-types'
import style from './styles/index.cssr'

export const bubbleProps = {
  ...(useTheme.props as ThemeProps<TypingBubbleTheme>),
  ...TypingBubbleProps
}

export default defineComponent({
  name: 'TypingBubble',
  props: bubbleProps,
  setup(props) {
    const { inlineThemeDisabled, mergedClsPrefixRef }
            = useConfig(props)
    const themeRef = useTheme(
      'TypingBubble',
      '-typing-bubble',
      style,
      bubbleLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      return {

      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('TypingBubble', undefined, cssVarsRef, props)
      : undefined

    const { typedContent, isTyping } = useTypewriter(
      props.content,
      props.options
    )

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
    const {
      mergedClsPrefix,
      typedContent,
      isTyping,
      isMarkdown
    } = this

    const effect = isTyping ? 'typing' : null

    return (
      <div
        class={[
          `${mergedClsPrefix}-typing-bubble`,
          this.themeClass,
        ]}
        style={this.cssVars as CSSProperties}
      >
        {(isMarkdown ? (
          <NMarkdown data-effect={effect} content={typedContent} />
        ) : (
          <div data-effect={effect}>
            <p>{typedContent}</p>
          </div>
        ))}
      </div>
    )
  }
})
