import CodeMirror from 'codemirror'
import 'codemirror/mode/htmlmixed/htmlmixed'

export default {
  mounted () {
    this.$refs.doc.querySelectorAll('textarea').forEach(ta => {
      CodeMirror.fromTextArea(ta, {
        lineNumbers: true,
        mode: 'htmlmixed'
      })
    })
  }
}
