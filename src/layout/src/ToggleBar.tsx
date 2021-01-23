import { h, defineComponent } from 'vue'

export default defineComponent({
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  render () {
    return (
      <div
        class={[
          'n-layout-toggle-bar',
          {
            'n-layout-toggle-bar--collapsed': this.collapsed
          }
        ]}
      >
        <div class="n-layout-toggle-bar__top" />
        <div class="n-layout-toggle-bar__bottom" />
      </div>
    )
  }
})
