import { h, defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    onClick: Function as PropType<(e: MouseEvent) => void>,
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  render () {
    const { clsPrefix } = this
    return (
      <div
        onClick={this.onClick}
        class={[
          `${clsPrefix}-layout-toggle-bar`,
          this.collapsed && `${clsPrefix}-layout-toggle-bar--collapsed`
        ]}
      >
        <div class={`${clsPrefix}-layout-toggle-bar__top`} />
        <div class={`${clsPrefix}-layout-toggle-bar__bottom`} />
      </div>
    )
  }
})
