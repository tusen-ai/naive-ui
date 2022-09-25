import { defineComponent, h, inject, ref, onBeforeUnmount } from 'vue'
import type { PropType } from 'vue'
import { off, on } from 'evtd'
import { dataTableInjectionKey } from '../interface'
import { clampValueByCSSRules } from '../utils'

function toNumber (value: string | number): number
function toNumber (value?: string | number): number | undefined
function toNumber (value?: string | number): number | undefined {
  return value !== undefined
    ? typeof value === 'number'
      ? value
      : parseFloat(value)
    : value
}

export default defineComponent({
  name: 'ColumnResizeButton',
  props: {
    minWidth: [String, Number],
    maxWidth: [String, Number],
    getCurrentWidth: {
      type: Function as PropType<() => number | undefined>,
      required: true
    },
    onResize: {
      type: Function as PropType<
      (resizedWidth: number, limitedWidth: number) => void
      >,
      required: true
    }
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mergedClsPrefixRef } = inject(dataTableInjectionKey)!
    const activeRef = ref(false)
    let startX = 0
    let startWidth = 0
    function getLimitedWidth (width: number): number {
      return clampValueByCSSRules(
        width,
        toNumber(props.minWidth),
        toNumber(props.maxWidth)
      )
    }
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
      const resizedWidth = startWidth + getMouseX(e) - startX
      const limitedWidth = getLimitedWidth(resizedWidth)
      props.onResize?.(resizedWidth, limitedWidth)
    }
    function handleMouseup (): void {
      activeRef.value = false
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
