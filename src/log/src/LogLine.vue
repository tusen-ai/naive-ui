<template>
  <pre class="n-log__line">{{ highlight ? null : line }}</pre>
</template>

<script>
import { defineComponent } from 'vue'

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
    }
  }
})
</script>
