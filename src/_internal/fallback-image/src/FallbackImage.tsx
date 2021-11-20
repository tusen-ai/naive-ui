import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'FallbackImage',
  props: {
    fallbackSrc: {
      type: String,
      default: undefined
    }
  },
  setup () {},
  render () {
    const { fallbackSrc } = this
    return <img src={fallbackSrc} />
  }
})
