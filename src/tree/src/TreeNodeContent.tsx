import { h, defineComponent, ref, PropType } from 'vue'

export default defineComponent({
  name: 'TreeNodeContent',
  props: {
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
    onDragStart: Function as PropType<(e: DragEvent) => void>,
    onDragEnd: Function as PropType<(e: DragEvent) => void>,
    onDragEnter: Function as PropType<(e: DragEvent) => void>,
    onDragOver: Function as PropType<(e: DragEvent) => void>,
    onDragLeave: Function as PropType<(e: DragEvent) => void>,
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
      const { onDragStart } = props
      if (onDragStart) onDragStart(e)
    }
    function doDragEnter (e: DragEvent): void {
      const { onDragEnter } = props
      if (onDragEnter) onDragEnter(e)
    }
    function doDragEnd (e: DragEvent): void {
      const { onDragEnd } = props
      if (onDragEnd) onDragEnd(e)
    }
    function doDragLeave (e: DragEvent): void {
      const { onDragLeave } = props
      if (onDragLeave) onDragLeave(e)
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
          'n-tree-node-content',
          {
            'n-tree-node-content--pending': pending,
            'n-tree-node-content--pending-bottom': pendingPosition === 'bottom',
            'n-tree-node-content--pending-body': pendingPosition === 'center',
            'n-tree-node-content--pending-top': pendingPosition === 'top',
            'n-tree-node-content--selected': selected,
            'n-tree-node-content--block': blockNode,
            'n-tree-node-content--checkable': checkable,
            'n-tree-node-content--hightlight': highlight
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
        <div class="n-tree-node-content__padding-box" />
        <div class="n-tree-node-content__text">{this.$slots}</div>
      </span>
    )
  }
})
