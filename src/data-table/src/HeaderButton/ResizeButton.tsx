import { defineComponent, h, inject, ref } from 'vue'
import type { PropType } from 'vue'
import { off, on } from 'evtd'
import { dataTableInjectionKey } from '../interface'

export default defineComponent({
  name: 'ColumnResizeButton',
  props: {
    getCurrentWidth: {
      type: Function as PropType<() => number>,
      required: true
    },
    onResize: {
      type: Function as PropType<(width: number) => void>,
      required: true
    }
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mergedClsPrefixRef } = inject(dataTableInjectionKey)!
    const activeRef = ref(false)
    let startX = 0
    let startWidth = 0
    function getMouseX (e: MouseEvent): number {
      return e.clientX
    }
    function handleMousedown (e: MouseEvent): void {
      startX = getMouseX(e)
      startWidth = props.getCurrentWidth() ?? 0
      activeRef.value = true
      on('mousemove', window, handleMousemove)
      on('mouseup', window, handleMouseup)
    }
    function handleMousemove (e: MouseEvent): void {
      const distanceX = getMouseX(e) - startX
      props.onResize?.(startWidth + distanceX)
    }
    function handleMouseup (): void {
      activeRef.value = false
      off('mousemove', window, handleMousemove)
      off('mouseup', window, handleMouseup)
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      active: activeRef,
      handleMousedown
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <span
        data-data-table-resizable
        class={[
          `${mergedClsPrefix}-data-table-resizable`,
          this.active && 'is-active'
        ]}
        onMousedown={this.handleMousedown}
      ></span>
    )
  }
})
