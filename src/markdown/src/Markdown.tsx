import type { PluggableList } from 'unified'
import type { CSSProperties } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { MarkdownTheme } from '../styles/light'
import { computed, defineComponent, h, toRef } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import markdownLight from '../styles/light'
import { useMarkdown } from './hooks/useMarkdown'
import style from './styles/index.cssr'

export const markdownProps = {
  ...(useTheme.props as ThemeProps<MarkdownTheme>),
  content: {
    type: String,
    default: ''
  },
  remarkPlugins: {
    type: Array as () => PluggableList,
    default: []
  },
  rehypePlugins: {
    type: Array as () => PluggableList,
    default: []
  },
  allowHtml: {
    type: Boolean,
    default: false
  },
  enableLatex: {
    type: Boolean,
    default: true
  }
}

export default defineComponent({
  name: 'Markdown',
  props: markdownProps,
  setup(props) {
    const { inlineThemeDisabled, mergedClsPrefixRef }
            = useConfig(props)
    const themeRef = useTheme(
      'Markdown',
      '-markdown',
      style,
      markdownLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        self: {
          fontSize,
          lineHeight
        }
      } = themeRef.value
      return {
        '--n-font-size': fontSize,
        '--n-line-height': lineHeight,
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('Markdown', undefined, cssVarsRef, props)
      : undefined

    const { Markdown } = useMarkdown()

    const content = toRef(props, 'content')
    const renderedContent = computed(() => {
      try {
        const res = Markdown({
          ...props
        }, content.value)
        return res
      }
      catch {
        return 'markdown error'
      }
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
      renderedContent
    } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-markdown`,
          this.themeClass
        ]}
        style={this.cssVars as CSSProperties}
      >
        {h(renderedContent)}
      </div>
    )
  }
})
