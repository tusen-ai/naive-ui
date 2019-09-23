import CodeMirror from 'codemirror'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/theme/vibrant-ink.css'

export default {
  mounted () {
    const textAreaNotToRender = new Set(this.$refs.doc.querySelectorAll('.not-code textarea'))
    this.$refs.doc.querySelectorAll('textarea').forEach(ta => {
      if (textAreaNotToRender.has(ta)) {
        return
      }
      CodeMirror.fromTextArea(ta, {
        lineNumbers: false,
        mode: 'htmlmixed',
        theme: 'vibrant-ink'
      })
    })
  }
}
