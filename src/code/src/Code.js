import { h, nextTick } from 'vue'
import {
  configurable,
  themeable,
  usecssr
} from '../../_mixins'
import styles from './styles/index.js'
import { warn } from '../../_utils/naive/warn'

export default {
  name: 'Code',
  mixins: [
    configurable,
    themeable,
    usecssr(styles)
  ],
  props: {
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
  watch: {
    language () {
      nextTick(this.setCode)
    },
    code () {
      nextTick(this.setCode)
    }
  },
  created () {
    if (__DEV__ && !this.hljs && !this.$naive.hljs) {
      warn('code', 'hljs is not set.')
    }
  },
  mounted () {
    this.setCode()
  },
  methods: {
    getHljs () {
      return this.hljs || this.$naive.hljs
    },
    generateCodeHTML (language, code, trim) {
      const languageValid = !!(language && this.getHljs().getLanguage(language))
      if (trim) code = code.trim()
      return {
        valid: languageValid,
        content: this.getHljs().highlight(language, code).value
      }
    },
    setCode () {
      const {
        code,
        language
      } = this
      if (language) {
        const {
          valid,
          content
        } = this.generateCodeHTML(language, code, this.trim)
        if (valid) {
          this.$refs.code.innerHTML = content
          return
        }
      }
      this.$refs.code.textContent = code
    }
  },
  render () {
    const { mergedTheme } = this
    return h('pre', {
      class: [
        'n-code',
        {
          [`n-${mergedTheme}-theme`]: mergedTheme
        }
      ]
    }, [
      h('code', {
        ref: 'code'
      })
    ])
  }
}
