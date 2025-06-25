import type { CSSProperties } from 'vue'
import type { PluggableList, Components } from 'vue-markdown-unified'
import type { ThemeProps } from '../../_mixins'
import type { MarkdownTheme } from '../styles/light'
import { computed, defineComponent, h, toRef } from 'vue'
import { Markdown } from 'vue-markdown-unified'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import markdownLight from '../styles/light'
import { useMarkdownComponents } from './hooks/useComponents'
import style from './styles/index.cssr'
import { useMarkdownContent } from './hooks/useMarkdownContent'

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
          lineHeight,
          hrColor,
          ulPadding,
          olPadding,
          aTextColor,
          tagColor,
          codePadding,
          tdPaddingMedium,
          thPaddingMedium,
          theadBgColor
        }
      } = themeRef.value
      return {
        '--n-font-size': fontSize,
        '--n-line-height': lineHeight,
        '--n-hr-color': hrColor,
        '--n-ul-padding': ulPadding,
        '--n-ol-padding': olPadding,
        '--n-a-text-color': aTextColor,
        '--n-code-bg-color': tagColor,
        '--n-code-padding': codePadding,
        '--n-th-padding': thPaddingMedium,
        '--n-td-padding': tdPaddingMedium,
        '--n-thead-bg-color': theadBgColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('Markdown', undefined, cssVarsRef, props)
      : undefined

    const Components = useMarkdownComponents() as Components

    const content = toRef(props, 'content')
    const renderedContent = computed(() => {
      try {
        const escapedContent = useMarkdownContent(content.value || '', { ...props})

        const res = Markdown(`${escapedContent}`, {
          components: Components,
          ...props
        })
        console.log(res)
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
