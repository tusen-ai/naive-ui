<script>
import NMessage from './Message'

export default {
  data () {
    return {
      theme: null,
      content: null,
      option: null
    }
  },
  render (h) {
    console.log('theme', this.theme)
    return h(NMessage, {
      props: {
        theme: this.theme,
        content: this.content,
        option: this.option
      }
    })
  }
}
</script>
