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
    selected: {
      type: Boolean,
      default: false
    },
    blockNode: {
      type: Boolean,
      default: false
    },
    checkable: {
      type: Boolean,
      default: false
    },
    highlight: {
      type: Boolean,
      default: false
    },
    onClick: Function as PropType<(e: MouseEvent) => void>,
    onDragstart: Function as PropType<(e: DragEvent) => void>,
    onDragend: Function as PropType<(e: DragEvent) => void>,
    onDragenter: Function as PropType<(e: DragEvent) => void>,
    onDragover: Function as PropType<(e: DragEvent) => void>,
    onDragleave: Function as PropType<(e: DragEvent) => void>,
    onDrop: Function as PropType<
    (e: DragEvent, dropPosition: 'bottom' | 'center' | 'top') => void
    >
  },
  setup (props) {
    const pendingRef = ref(false)
    const pendingPositionRef = ref<'top' | 'center' | 'bottom' | null>(null)
    const selfRef = ref<HTMLElement | null>(null)
    function doClick (e: MouseEvent): void {
      const { onClick } = props
      if (onClick) onClick(e)
    }
    function doDragStart (e: DragEvent): void {
      const { onDragstart } = props
      if (onDragstart) onDragstart(e)
    }
    function doDragEnter (e: DragEvent): void {
      const { onDragenter } = props
      if (onDragenter) onDragenter(e)
    }
    function doDragEnd (e: DragEvent): void {
      const { onDragend } = props
      if (onDragend) onDragend(e)
    }
    function doDragLeave (e: DragEvent): void {
      const { onDragleave } = props
      if (onDragleave) onDragleave(e)
    }
    // function doDragOver (e: DragEvent) {
    //   const { onDragOver } = props
    //   if (onDragOver) onDragOver(e)
    // }
    function doDrop (
      e: DragEvent,
      dropPosition: 'top' | 'bottom' | 'center'
    ): void {
      const { onDrop } = props
      if (onDrop) onDrop(e, dropPosition)
    }
    function handleClick (e: MouseEvent): void {
      doClick(e)
    }
    function handleContentDragStart (e: DragEvent): void {
      doDragStart(e)
    }
    function handleContentDragEnter (e: DragEvent): void {
      if (
        e.currentTarget &&
        e.relatedTarget &&
        (e.currentTarget as HTMLElement).contains(
          e.relatedTarget as HTMLElement
        )
      ) {
        return
      }
      doDragEnter(e)
    }
    function handleDragOverContent (e: DragEvent): void {
      e.preventDefault()
      const el = selfRef.value as HTMLElement
      pendingRef.value = true
      const elOffsetHeight = el.offsetHeight
      const elClientTop = el.getBoundingClientRect().top
      const eventOffsetY = e.clientY - elClientTop
      if (eventOffsetY <= 8) {
        pendingPositionRef.value = 'top'
      } else if (eventOffsetY >= elOffsetHeight - 8) {
        pendingPositionRef.value = 'bottom'
      } else {
        pendingPositionRef.value = 'center'
      }
    }
    function handleContentDragEnd (e: DragEvent): void {
      doDragEnd(e)
    }
    function handleContentDragLeave (e: DragEvent): void {
      if (
        e.currentTarget &&
        e.relatedTarget &&
        (e.currentTarget as HTMLElement).contains(
          e.relatedTarget as HTMLElement
        )
      ) {
        return
      }
      pendingRef.value = false
      doDragLeave(e)
    }
    function handleContentDrop (e: DragEvent): void {
      e.preventDefault()
      pendingRef.value = false
      if (pendingPositionRef.value !== null) {
        const dropPosition = {
          top: 'top',
          bottom: 'bottom',
          center: 'center'
        }[pendingPositionRef.value]
        doDrop(e, dropPosition as 'top' | 'bottom' | 'center')
      }
    }
    return {
      selfRef,
      pending: pendingRef,
      pendingPosition: pendingPositionRef,
      handleContentDragLeave,
      handleContentDragStart,
      handleDragOverContent,
      handleContentDragEnd,
      handleContentDragEnter,
      handleContentDrop,
      handleClick
    }
  },
  render () {
    const {
      clsPrefix,
      pending,
      pendingPosition,
      selected,
      blockNode,
      checkable,
      highlight,
      handleContentDragLeave,
      handleContentDragStart,
      handleDragOverContent,
      handleContentDragEnd,
      handleContentDragEnter,
      handleContentDrop,
      handleClick
    } = this
    return (
      <span
        ref="selfRef"
        class={[
          `${clsPrefix}-tree-node-content`,
          {
            [`${clsPrefix}-tree-node-content--pending`]: pending,
            [`${clsPrefix}-tree-node-content--pending-bottom`]:
              pendingPosition === 'bottom',
            [`${clsPrefix}-tree-node-content--pending-body`]:
              pendingPosition === 'center',
            [`${clsPrefix}-tree-node-content--pending-top`]:
              pendingPosition === 'top',
            [`${clsPrefix}-tree-node-content--selected`]: selected,
            [`${clsPrefix}-tree-node-content--block`]: blockNode,
            [`${clsPrefix}-tree-node-content--checkable`]: checkable,
            [`${clsPrefix}-tree-node-content--hightlight`]: highlight
          }
        ]}
        onDragleave={handleContentDragLeave}
        onDragstart={handleContentDragStart}
        onDragover={handleDragOverContent}
        onDragend={handleContentDragEnd}
        onDragenter={handleContentDragEnter}
        onDrop={handleContentDrop}
        onClick={handleClick}
      >
        <div class={`${clsPrefix}-tree-node-content__padding-box`} />
        <div class={`${clsPrefix}-tree-node-content__text`}>{this.$slots}</div>
      </span>
    )
  }
})
