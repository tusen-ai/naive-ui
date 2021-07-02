import { h, defineComponent, ref, PropType } from 'vue'
import { render } from '../../_utils'
import { TmNode } from './interface'

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
    onDragstart: Function as PropType<(e: DragEvent) => void>,
    tmNode: {
      type: Object as PropType<TmNode>,
      required: true
    }
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
    const {
      clsPrefix,
      handleClick,
      onDragstart,
      tmNode: {
        rawNode: { prefix, label, suffix }
      }
    } = this
    return (
      <span
        ref="selfRef"
        class={[`${clsPrefix}-tree-node-content`]}
        onClick={handleClick}
        draggable={onDragstart === undefined ? undefined : true}
        onDragstart={onDragstart}
      >
        {prefix ? (
          <div class={`${clsPrefix}-tree-node-content__prefix`}>
            {render(prefix)}
          </div>
        ) : null}
        <div class={`${clsPrefix}-tree-node-content__text`}>
          {render(label)}
        </div>
        {suffix ? (
          <div class={`${clsPrefix}-tree-node-content__suffix`}>
            {render(suffix)}
          </div>
        ) : null}
      </span>
    )
  }
})
