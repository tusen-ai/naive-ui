import { h, defineComponent, computed, CSSProperties } from 'vue'

export default defineComponent({
  name: 'GridItem',
  props: {
    span: {
      type: Number,
      default: 1
    }
  },
  setup (props) {
    return {
      style: computed<CSSProperties>(() => {
        const { span } = props
        return {
          gridColumn: `span ${span} / span ${span}`
        }
      })
    }
  },
  render () {
    return <div>{this.$slots}</div>
  }
})
