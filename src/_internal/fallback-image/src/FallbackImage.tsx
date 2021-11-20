import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'FallbackImage',
  props: {
    fallbackImageUrl: {
      type: String,
      default: ''
    }
  },
  setup () {},
  render () {
    const { fallbackImageUrl } = this
    return <img src={fallbackImageUrl} />
  }
})
