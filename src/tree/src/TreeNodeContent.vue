<template>
  <span
    ref="selfRef"
    class="n-tree-node-content"
    :class="{
      'n-tree-node-content--pending': pending,
      'n-tree-node-content--pending-bottom': pendingPosition === 'bottom',
      'n-tree-node-content--pending-body': pendingPosition === 'body',
      'n-tree-node-content--pending-top': pendingPosition === 'top',
      'n-tree-node-content--selected': selected,
      'n-tree-node-content--block': blockNode,
      'n-tree-node-content--checkable': checkable,
      'n-tree-node-content--hightlight': highlight
    }"
    @dragleave="handleContentDragLeave"
    @dragstart="handleContentDragStart"
    @dragover="handleDragOverContent"
    @dragend="handleContentDragEnd"
    @dragenter="handleContentDragEnter"
    @drop="handleContentDrop"
    @click="handleClick"
  >
    <div class="n-tree-node-content__padding-box" />
    <div class="n-tree-node-content__text">
      <slot />
    </div>
  </span>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NTreeNodeContent',
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
    onClick: {
      type: Function,
      default: undefined
    },
    onDragStart: {
      type: Function,
      default: undefined
    },
    onDragEnd: {
      type: Function,
      default: undefined
    },
    onDragEnter: {
      type: Function,
      default: undefined
    },
    onDragOver: {
      type: Function,
      default: undefined
    },
    onDragLeave: {
      type: Function,
      default: undefined
    },
    onDrop: {
      type: Function,
      default: undefined
    }
  },
  setup (props) {
    const pendingRef = ref(false)
    const pendingPositionRef = ref<'top' | 'center' | 'bottom' | null>(null)
    const selfRef = ref<HTMLElement | null>(null)
    function doClick () {
      const { onClick } = props
      if (onClick) onClick()
    }
    function doDragStart (e: DragEvent) {
      const { onDragStart } = props
      if (onDragStart) onDragStart(e)
    }
    function doDragEnter (e: DragEvent) {
      const { onDragEnter } = props
      if (onDragEnter) onDragEnter(e)
    }
    function doDragEnd (e: DragEvent) {
      const { onDragEnd } = props
      if (onDragEnd) onDragEnd(e)
    }
    function doDragLeave (e: DragEvent) {
      const { onDragLeave } = props
      if (onDragLeave) onDragLeave(e)
    }
    // function doDragOver (e: DragEvent) {
    //   const { onDragOver } = props
    //   if (onDragOver) onDragOver(e)
    // }
    function doDrop (e: DragEvent, dropPosition: 'top' | 'bottom' | 'center') {
      const { onDrop } = props
      if (onDrop) onDrop(e, dropPosition)
    }
    function handleClick () {
      doClick()
    }
    function handleContentDragStart (e: DragEvent) {
      doDragStart(e)
    }
    function handleContentDragEnter (e: DragEvent) {
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
    function handleDragOverContent (e: DragEvent) {
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
    function handleContentDragEnd (e: DragEvent) {
      doDragEnd(e)
    }
    function handleContentDragLeave (e: DragEvent) {
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
    function handleContentDrop (e: DragEvent) {
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
  }
})
</script>
