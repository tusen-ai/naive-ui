import { defineComponent, h, inject, ref, onBeforeUnmount } from 'vue'
import type { PropType } from 'vue'
import { off, on } from 'evtd'
import { dataTableInjectionKey } from '../interface'

export default defineComponent({
  name: 'ColumnResizeButton',
  props: {
    onResizeStart: Function,
    onResize: Function as PropType<(displacementX: number) => void>,
    onResizeEnd: Function
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mergedClsPrefixRef } = inject(dataTableInjectionKey)!
    const activeRef = ref(false)
    let startX = 0
    function getMouseX (e: MouseEvent): number {
      return e.clientX
    }
    function handleMousedown (e: MouseEvent): void {
      const alreadyStarted = activeRef.value
      startX = getMouseX(e)
      activeRef.value = true
      if (!alreadyStarted) {
        on('mousemove', window, handleMousemove)
        on('mouseup', window, handleMouseup)
        props.onResizeStart?.()
      }
    }
    function handleMousemove (e: MouseEvent): void {
      props.onResize?.(getMouseX(e) - startX)
    }
    function handleMouseup (): void {
      activeRef.value = false
      props.onResizeEnd?.()
      off('mousemove', window, handleMousemove)
      off('mouseup', window, handleMouseup)
    }
    onBeforeUnmount(() => {
      off('mousemove', window, handleMousemove)
      off('mouseup', window, handleMouseup)
    })
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
          `${mergedClsPrefix}-data-table-resize-button`,
          this.active && `${mergedClsPrefix}-data-table-resize-button--active`
        ]}
        onMousedown={this.handleMousedown}
      />
    )
  }
})
