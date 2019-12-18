<template>
  <pre class="n-log__line" />
</template>

<script>
export default {
  props: {
    line: {
      type: String,
      default: null
    },
    language: {
      type: String,
      default: 'javascript'
    }
  },
  watch: {
    line (value) {
      this.$el.innerHTML = this.getHljs().highlight(this.language, value).value
    }
  },
  mounted () {
    this.$el.innerHTML = this.getHljs().highlight(this.language, this.line).value
  },
  methods: {
    getHljs () {
      return this.hljs || this.$naive.hljs
    }
  }
}
</script>
