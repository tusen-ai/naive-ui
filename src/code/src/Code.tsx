import {
  defineComponent,
  h,
  toRef,
  watch,
  onMounted,
  ref,
  computed,
  PropType
} from 'vue'
import {
  useTheme,
  useHljs,
  Hljs,
  useConfig,
  useThemeClass
} from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
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
  lineNumbers: Boolean,
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
    // reference: https://www.yangdx.com/2020/04/144.html
    const addLineNumbersForCode = (html: string): string => {
      let num = 1
      // console.log(html)
      // if (/\r|\n$/.test(html)) {
      html += '<span class="ln-eof"></span>'
      // }
      html = html.replace(/\r\n|\r|\n/g, function (a) {
        num++
        const text = ('  ' + String(num)).slice(-4) // 最大支持到千位数
        return a + '<span class="ln-num" data-num="' + text + '"></span>'
      })
      html = '<span class="ln-num" data-num="  1"></span>' + html
      html = '<span class="ln-bg"></span>' + html
      return html
    }

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
          codeEl.innerHTML = props.inline ? html : `<pre ${props.lineNumbers ? 'class="hljsln"' : ''}>${
            props.lineNumbers ? addLineNumbersForCode(html) : html
          }</pre>`
          return
        }
      }
      if (props.inline) {
        codeEl.textContent = code
        return
      }
      const maybePreEl = codeEl.children[0]
      if (maybePreEl && maybePreEl.tagName === 'PRE') {
        if (props.lineNumbers) {
          maybePreEl.classList.add('hljsln')
          maybePreEl.innerHTML = addLineNumbersForCode(code)
        } else {
          maybePreEl.textContent = code
        }
      } else {
        const warp = document.createElement('pre')
        if (props.lineNumbers) {
          warp.classList.add('hljsln')
          warp.innerHTML = code
        } else {
          warp.textContent = code
        }
        codeEl.innerHTML = ''
        codeEl.appendChild(warp)
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
          // extracted from hljs atom-one-light.scss
          'mono-3': $1,
          'hue-1': $2,
          'hue-2': $3,
          'hue-3': $4,
          'hue-4': $5,
          'hue-5': $6,
          'hue-5-2': $7,
          'hue-6': $8,
          'hue-6-2': $9,
          'padding-color': $10,
          'line-number-color': $11
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
        '--n-padding-color': $10,
        '--n-line-number-color': $11
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
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix, wordWrap, onRender } = this
    onRender?.()
    return (
      <code
        class={[
          `${mergedClsPrefix}-code`,
          this.themeClass,
          wordWrap && `${mergedClsPrefix}-code--word-wrap`
        ]}
        style={this.cssVars as any}
        ref="codeRef"
      >
        {this.$slots}
      </code>
    )
  }
})
