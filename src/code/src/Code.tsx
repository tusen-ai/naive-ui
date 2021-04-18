import {
  defineComponent,
  h,
  toRef,
  watch,
  onMounted,
  ref,
  computed,
  PropType,
  CSSProperties
} from 'vue'
import { useTheme, useHljs, Hljs, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { codeLight } from '../styles'
import type { CodeTheme } from '../styles'
import style from './styles/index.cssr'
import type { ExtractPublicPropTypes } from '../../_utils'

const codeProps = {
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
  uri: {
    type: Boolean,
    default: false
  }
}

export type CodeProps = ExtractPublicPropTypes<typeof codeProps>

export default defineComponent({
  name: 'Code',
  props: codeProps,
  setup (props, { slots }) {
    const { mergedClsPrefix } = useConfig()
    const codeRef = ref<HTMLElement | null>(null)
    const hljsRef = useHljs(props)
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
          codeEl.innerHTML = html
          return
        }
      }
      codeEl.textContent = code
    }
    onMounted(setCode)
    watch(toRef(props, 'language'), setCode)
    watch(toRef(props, 'code'), setCode)
    watch(hljsRef, setCode)
    const themeRef = useTheme(
      'Code',
      'Code',
      style,
      codeLight,
      props,
      mergedClsPrefix
    )
    return {
      cPrefix: mergedClsPrefix,
      codeRef,
      cssVars: computed(() => {
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
            'hue-6-2': $9
          }
        } = themeRef.value
        return {
          '--font-size': fontSize,
          '--font-family': fontFamilyMono,
          '--font-weight-strong': fontWeightStrong,
          '--bezier': cubicBezierEaseInOut,
          '--text-color': textColor,
          '--mono-3': $1,
          '--hue-1': $2,
          '--hue-2': $3,
          '--hue-3': $4,
          '--hue-4': $5,
          '--hue-5': $6,
          '--hue-5-2': $7,
          '--hue-6': $8,
          '--hue-6-2': $9
        }
      })
    }
  },
  render () {
    const { default: defaultSlot } = this.$slots
    const { cPrefix } = this
    return (
      <code class={`${cPrefix}-code`} style={this.cssVars as CSSProperties}>
        {defaultSlot ? defaultSlot() : <pre ref="codeRef"></pre>}
      </code>
    )
  }
})
