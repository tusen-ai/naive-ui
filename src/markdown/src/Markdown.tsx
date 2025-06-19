import type { CSSProperties } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { MarkdownTheme } from '../styles/light'
import { computed, defineComponent, h, toRef } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import bubbleLight from '../styles/light'
import { MarkdownProps } from './public-types'
import style from './styles/index.cssr'

export const bubbleProps = {
  ...(useTheme.props as ThemeProps<MarkdownTheme>),
  ...MarkdownProps
}

export default defineComponent({
  name: 'Markdown',
  props: bubbleProps,
  setup(props) {
    const { inlineThemeDisabled, mergedClsPrefixRef }
            = useConfig(props)
    const themeRef = useTheme(
      'Markdown',
      '-markdown',
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
      ? useThemeClass('Markdown', undefined, cssVarsRef, props)
      : undefined

    const content = toRef(props, 'content')
    const renderedContent = computed(() => {
      return content.value
    })

    return {
      mergedTheme: themeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      renderedContent
    }
  },
  render() {
    const {
      mergedClsPrefix,
      mergedTheme,
      renderedContent
    } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-markdown`,
          this.themeClass
        ]}
        style={this.cssVars as CSSProperties}
        innerHTML={renderedContent}
      >
      </div>
    )
  }
})
