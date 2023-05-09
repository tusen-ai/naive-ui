import { h, defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    onClick: Function as PropType<(e: MouseEvent) => void>
  },
  render () {
    const { clsPrefix } = this
    return (
      <div onClick={this.onClick} class={`${clsPrefix}-layout-toggle-bar`}>
        <div class={`${clsPrefix}-layout-toggle-bar__top`} />
        <div class={`${clsPrefix}-layout-toggle-bar__bottom`} />
      </div>
    )
  }
})
