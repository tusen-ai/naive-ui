import { h, defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    onClick: Function as PropType<(e: MouseEvent) => void>,
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  render () {
    return (
      <div
        onClick={this.onClick}
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
