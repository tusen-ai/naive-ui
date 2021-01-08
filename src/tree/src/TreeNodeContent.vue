<template>
  <span
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

<script>
import { defineComponent } from 'vue'

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
  data () {
    return {
      pending: false,
      pendingPosition: null
    }
  },
  methods: {
    doClick () {
      const { onClick } = this
      if (onClick) onClick()
    },
    doDragStart (e) {
      const { onDragStart } = this
      if (onDragStart) onDragStart(e)
    },
    doDragEnter (e) {
      const { onDragEnter } = this
      if (onDragEnter) onDragEnter(e)
    },
    doDragEnd (e) {
      const { onDragEnd } = this
      if (onDragEnd) onDragEnd(e)
    },
    doDragLeave (e) {
      const { onDragLeave } = this
      if (onDragLeave) onDragLeave(e)
    },
    doDragOver (e) {
      const { onDragOver } = this
      if (onDragOver) onDragOver(e)
    },
    doDrop (e, dropPosition) {
      const { onDrop } = this
      if (onDrop) onDrop(e, dropPosition)
    },
    handleClick () {
      this.doClick()
    },
    handleContentDragStart (e) {
      this.doDragStart(e)
    },
    handleContentDragEnter (e) {
      if (
        e.currentTarget &&
        e.relatedTarget &&
        e.currentTarget.contains(e.relatedTarget)
      ) {
        return
      }
      this.doDragEnter(e)
    },
    handleDragOverContent (e) {
      e.preventDefault()
      const el = this.$el
      this.pending = true
      const elOffsetHeight = el.offsetHeight
      const elClientTop = el.getBoundingClientRect().top
      const eventOffsetY = e.clientY - elClientTop
      if (eventOffsetY <= 8) {
        this.pendingPosition = 'top'
      } else if (eventOffsetY >= elOffsetHeight - 8) {
        this.pendingPosition = 'bottom'
      } else {
        this.pendingPosition = 'body'
      }
      this.doDragOver(e)
    },
    handleContentDragEnd (e) {
      this.doDragEnd(e)
    },
    handleContentDragLeave (e) {
      if (
        e.currentTarget &&
        e.relatedTarget &&
        e.currentTarget.contains(e.relatedTarget)
      ) {
        return
      }
      this.pending = false
      this.doDragLeave(e)
    },
    handleContentDrop (e) {
      e.preventDefault()
      this.pending = false
      const dropPosition = {
        top: 'top',
        bottom: 'bottom',
        body: 'center'
      }[this.pendingPosition]
      this.doDrop(e, dropPosition)
    }
  }
})
</script>
