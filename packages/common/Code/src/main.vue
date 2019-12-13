<script>
import hljs from 'highlight.js'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

function generateCodeHTML (language, code, trim) {
  const languageValid = !!(language && hljs.getLanguage(language))
  if (trim) code = code.trim()
  return {
    valid: languageValid,
    content: hljs.highlight(language, code).value
  }
}

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
  mounted () {
    this.setCode()
  },
  methods: {
    setCode () {
      const {
        valid,
        content
      } = generateCodeHTML(this.language, this.code, this.trim)
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
