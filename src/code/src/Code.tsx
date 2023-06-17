import {
  defineComponent,
  h,
  toRef,
  watch,
  onMounted,
  ref,
  computed,
  type PropType
} from 'vue'
import {
  useTheme,
  useHljs,
  type Hljs,
  useConfig,
  useThemeClass,
  type ThemeProps
} from '../../_mixins'
import { codeLight } from '../styles'
import type { CodeTheme } from '../styles'
import style from './styles/index.cssr'
import type { ExtractPublicPropTypes } from '../../_utils'

export const codeProps = {
  ...(useTheme.props as ThemeProps<CodeTheme>),
  language: String,
  code: {
    type: String,
    default: ''
  },
  trim: {
    type: Boolean,
    default: true
  },
  hljs: Object as PropType<Hljs>,
  uri: Boolean,
  inline: Boolean,
  wordWrap: Boolean,
  showLineNumbers: Boolean,
  // In n-log, we only need to mount code's style for highlight
  internalFontSize: Number,
  internalNoHighlight: Boolean
}

export type CodeProps = ExtractPublicPropTypes<typeof codeProps>

export default defineComponent({
  name: 'Code',
  props: codeProps,
  setup (props, { slots }) {
    const { internalNoHighlight } = props
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig()
    const codeRef = ref<HTMLElement | null>(null)
    const hljsRef = internalNoHighlight ? { value: undefined } : useHljs(props)
    const createCodeHtml = (
      language: string,
      code: string,
      trim: boolean
    ): string | null => {
      const { value: hljs } = hljsRef
      if (!hljs) {
        return null
      }
      if (!(language && hljs.getLanguage(language))) {
        return null
      }
      return hljs.highlight(trim ? code.trim() : code, {
        language
      }).value
    }
    const mergedShowLineNumbersRef = computed(() => {
      if (props.inline || props.wordWrap) return false
      return props.showLineNumbers
    })
    const setCode = (): void => {
      if (slots.default) return
      const { value: codeEl } = codeRef
      if (!codeEl) return
      const { language } = props
      const code = props.uri
        ? window.decodeURIComponent(props.code)
        : props.code
      if (language) {
        const html = createCodeHtml(language, code, props.trim)
        if (html !== null) {
          if (props.inline) {
            codeEl.innerHTML = html
          } else {
            const prevPreEl = codeEl.querySelector('.__code__')
            if (prevPreEl) codeEl.removeChild(prevPreEl)
            const preEl = document.createElement('pre')
            preEl.className = '__code__'
            preEl.innerHTML = html
            codeEl.appendChild(preEl)
          }
          return
        }
      }
      if (props.inline) {
        codeEl.textContent = code
        return
      }
      const maybePreEl = codeEl.querySelector('.__code__')
      if (maybePreEl) {
        maybePreEl.textContent = code
      } else {
        const wrap = document.createElement('pre')
        wrap.className = '__code__'
        wrap.textContent = code
        codeEl.innerHTML = ''
        codeEl.appendChild(wrap)
      }
    }
    onMounted(setCode)
    watch(toRef(props, 'language'), setCode)
    watch(toRef(props, 'code'), setCode)
    if (!internalNoHighlight) watch(hljsRef, setCode)
    const themeRef = useTheme(
      'Code',
      '-code',
      style,
      codeLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut, fontFamilyMono },
        self: {
          textColor,
          fontSize,
          fontWeightStrong,
          lineNumberTextColor,
          // extracted from hljs atom-one-light.scss
          'mono-3': $1,
          'hue-1': $2,
          'hue-2': $3,
          'hue-3': $4,
          'hue-4': $5,
          'hue-5': $6,
          'hue-5-2': $7,
          'hue-6': $8,
          'hue-6-2': $9
        }
      } = themeRef.value
      const { internalFontSize } = props
      return {
        '--n-font-size': internalFontSize ? `${internalFontSize}px` : fontSize,
        '--n-font-family': fontFamilyMono,
        '--n-font-weight-strong': fontWeightStrong,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-text-color': textColor,
        '--n-mono-3': $1,
        '--n-hue-1': $2,
        '--n-hue-2': $3,
        '--n-hue-3': $4,
        '--n-hue-4': $5,
        '--n-hue-5': $6,
        '--n-hue-5-2': $7,
        '--n-hue-6': $8,
        '--n-hue-6-2': $9,
        '--n-line-number-text-color': lineNumberTextColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'code',
        computed(() => {
          return `${props.internalFontSize || 'a'}`
        }),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      codeRef,
      mergedShowLineNumbers: mergedShowLineNumbersRef,
      lineNumbers: computed(() => {
        let number = 1
        const numbers: number[] = []
        let lastIsLineWrap = false
        for (const char of props.code) {
          if (char === '\n') {
            lastIsLineWrap = true
            numbers.push(number++)
          } else {
            lastIsLineWrap = false
          }
        }
        if (!lastIsLineWrap) {
          numbers.push(number++)
        }
        return numbers.join('\n')
      }),
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix, wordWrap, mergedShowLineNumbers, onRender } = this
    onRender?.()
    return (
      <code
        class={[
          `${mergedClsPrefix}-code`,
          this.themeClass,
          wordWrap && `${mergedClsPrefix}-code--word-wrap`,
          mergedShowLineNumbers && `${mergedClsPrefix}-code--show-line-numbers`
        ]}
        style={this.cssVars as any}
        ref="codeRef"
      >
        {mergedShowLineNumbers ? (
          <pre class={`${mergedClsPrefix}-code__line-numbers`}>
            {this.lineNumbers}
          </pre>
        ) : null}
        {this.$slots.default?.()}
      </code>
    )
  }
})
