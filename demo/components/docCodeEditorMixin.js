import CodeMirror from 'codemirror'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/theme/vibrant-ink.css'

export default {
  mounted () {
    this.$refs.doc.querySelectorAll('textarea').forEach(ta => {
      CodeMirror.fromTextArea(ta, {
        lineNumbers: false,
        mode: 'htmlmixed',
        theme: 'vibrant-ink'
      })
    })
  }
}
