import {
  defineComponent,
  h,
  nextTick,
  toRef,
  watch,
  getCurrentInstance,
  onMounted,
  ref,
  computed
} from 'vue'
import { useTheme, useConfig } from '../../_mixins'
import { warn } from '../../_utils'
import { codeLight } from '../styles'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Code',
  props: {
    ...useTheme.props,
    language: {
      type: String,
      default: undefined
    },
    code: {
      type: String,
      default: ''
    },
    trim: {
      type: Boolean,
      default: true
    },
    hljs: {
      type: Object,
      default: undefined
    }
  },
  setup (props, { slots }) {
    const vm = getCurrentInstance().proxy
    const codeRef = ref(null)
    const { NConfigProvider } = useConfig(props)
    if (
      __DEV__ &&
      !props.hljs &&
      !NConfigProvider.mergedHljs &&
      !vm.$naive.hljs
    ) {
      warn('code', 'hljs is not set.')
    }
    const getHljs = () => {
      return props.hljs || NConfigProvider.mergedHljs || vm.$naive.hljs
    }
    const generateCodeHTML = (language, code, trim) => {
      const hljs = getHljs()
      const languageValid = !!(language && hljs.getLanguage(language))
      if (trim) code = code.trim()
      return {
        valid: languageValid,
        content: hljs.highlight(language, code).value
      }
    }
    const setCode = () => {
      if (slots.default) return
      const { code, language } = props
      if (language) {
        const { valid, content } = generateCodeHTML(language, code, props.trim)
        if (valid) {
          codeRef.value.innerHTML = content
          return
        }
      }
      codeRef.value.textContent = code
    }
    onMounted(setCode)
    watch(toRef(props, 'language'), () => {
      nextTick(setCode)
    })
    watch(toRef(props, 'code'), () => {
      nextTick(setCode)
    })
    const themeRef = useTheme('Code', 'Code', style, codeLight, props)
    return {
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
    return h(
      'pre',
      {
        class: 'n-code',
        style: this.cssVars
      },
      [
        defaultSlot
          ? defaultSlot()
          : h('code', {
            ref: 'codeRef'
          })
      ]
    )
  }
})
