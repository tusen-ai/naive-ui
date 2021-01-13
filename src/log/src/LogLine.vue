<template>
  <pre class="n-log__line">{{ highlight ? null : line }}</pre>
</template>

<script>
import { defineComponent } from 'vue'
import { useConfig } from '../../_mixins'

export default defineComponent({
  inject: {
    NLog: {
      default: null
    }
  },
  props: {
    line: {
      type: String,
      default: undefined
    }
  },
  setup (props) {
    return {
      ...useConfig(props)
    }
  },
  computed: {
    highlight () {
      return this.NLog.highlight
    },
    language () {
      return this.NLog.language
    },
    trim () {
      return this.NLog.trim
    },
    trimedLine () {
      if (this.trim) return (this.line || '').trim()
      else return this.line
    }
  },
  watch: {
    line (value) {
      this.setInnerHTML()
    }
  },
  mounted () {
    this.setInnerHTML()
  },
  methods: {
    setInnerHTML () {
      if (this.highlight) {
        this.$el.innerHTML = this.generateCodeHTML(
          this.language,
          this.trimedLine,
          false
        ).content
      }
    },
    generateCodeHTML (language, code, trim) {
      const { mergedHljs: hljs } = this.NLog
      const languageValid = !!(language && hljs.getLanguage(language))
      if (trim) code = code.trim()
      return {
        valid: languageValid,
        content: hljs.highlight(language, code).value
      }
    }
  }
})
</script>
