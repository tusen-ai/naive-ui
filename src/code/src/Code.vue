<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/index.js'

export default {
  name: 'Code',
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
  props: {
    language: {
      type: String,
      required: true
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
      default: null
    }
  },
  watch: {
    language () {
      this.$nextTick(this.setCode)
    },
    code () {
      this.$nextTick(this.setCode)
    }
  },
  created () {
    if (!this.hljs && !this.$naive.hljs) {
      console.error('[naive-ui/code]: hljs is not set.')
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
        valid,
        content
      } = this.generateCodeHTML(this.language, this.code, this.trim)
      if (valid) {
        this.$refs.code.innerHTML = content
      } else {
        this.$refs.code.textContent = content
      }
    }
  },
  render (h) {
    return h('pre', {
      staticClass: 'n-code',
      class: {
        [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme
      }
    }, [
      h('code', {
        ref: 'code'
      })
    ])
  }
}
</script>
