<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NCode',
  mixins: [ withapp, themeable ],
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
        this.$el.innerHTML = content
      } else {
        this.$el.textContent = content
      }
    }
  },
  render (h) {
    return h('pre', {
      staticClass: 'n-code',
      class: {
        [`n-${this.synthesizedTheme}-theme`]: this.synthesizedTheme
      }
    })
  }
}
</script>
