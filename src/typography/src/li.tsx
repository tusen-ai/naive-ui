import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'Li',
  props: {
    alignText: {
      type: Boolean,
      default: false
    }
  },
  render () {
    return (
      <li
        class={[
          'n-li',
          {
            'n-li--align-text': this.alignText
          }
        ]}
      >
        {this.$slots}
      </li>
    )
  }
})
