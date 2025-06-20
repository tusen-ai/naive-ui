import type { Preset } from 'unified'
import type { CSSProperties } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { MarkdownTheme } from '../styles/light'
import { unified } from 'unified'
import { computed, defineComponent, h, inject, toRef } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import { configProviderInjectionKey } from '../../config-provider/src/context'
import bubbleLight from '../styles/light'
import style from './styles/index.cssr'

export const bubbleProps = {
  ...(useTheme.props as ThemeProps<MarkdownTheme>),
  content: {
    type: String,
    default: ''
  },
  mdPlugins: {
    type: Array as () => any,
    default: () => []
  }
}

export default defineComponent({
  name: 'Markdown',
  props: bubbleProps,
  setup(props) {
    const configProviderContext = inject(configProviderInjectionKey)
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

    const md = unified()

    function initMarkdownPlugins() {
      if (configProviderContext?.mergedMdPluginsRef.value) {
        configProviderContext?.mergedMdPluginsRef.value.forEach((plugin: Preset | null | undefined) => {
          md.use(plugin)
        })
      }
      if (props.mdPlugins.length) {
        props.mdPlugins.forEach((plugin: Preset | null | undefined) => {
          md.use(plugin)
        })
      }
    }
    initMarkdownPlugins()

    const content = toRef(props, 'content')
    const renderedContent = computed(() => {
      try {
        const res = md.processSync(content.value)
        return res.toString()
      }
      catch {
        return 'markdown渲染异常'
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
        innerHTML={renderedContent}
      >
      </div>
    )
  }
})
