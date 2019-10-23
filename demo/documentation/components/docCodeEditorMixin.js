export default {
  mounted () {
    const textAreaNotToRender = new Set(this.$refs.doc.querySelectorAll('.not-code textarea'))
    this.$refs.doc.querySelectorAll('textarea').forEach(ta => {
      if (textAreaNotToRender.has(ta)) {
        return
      }
      const rows = ta.value.split('\n').length
      ta.style.width = '100%'
      ta.setAttribute('rows', rows)
    })
  }
}
