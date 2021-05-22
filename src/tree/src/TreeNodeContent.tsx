import { h, defineComponent, ref, PropType } from 'vue'

export default defineComponent({
  name: 'TreeNodeContent',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onClick: Function as PropType<(e: MouseEvent) => void>,
    onDragstart: Function as PropType<(e: DragEvent) => void>
  },
  setup (props) {
    const selfRef = ref<HTMLElement | null>(null)
    function doClick (e: MouseEvent): void {
      const { onClick } = props
      if (onClick) onClick(e)
    }
    function handleClick (e: MouseEvent): void {
      doClick(e)
    }
    return {
      selfRef,
      handleClick
    }
  },
  render () {
    const { clsPrefix, handleClick, onDragstart } = this
    return (
      <span
        ref="selfRef"
        class={[`${clsPrefix}-tree-node-content`]}
        onClick={handleClick}
        draggable={!!onDragstart}
        onDragstart={onDragstart}
      >
        <div class={`${clsPrefix}-tree-node-content__padding-box`} />
        <div class={`${clsPrefix}-tree-node-content__text`}>{this.$slots}</div>
      </span>
    )
  }
})
