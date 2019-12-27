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
      'n-tree-node-content--checkable': checkable
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
    <slot />
  </span>
</template>

<script>
export default {
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
    }
  },
  data () {
    return {
      pending: false,
      pendingPosition: null
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    },
    handleContentDragStart (e) {
      this.$emit('dragstart', e)
    },
    handleContentDragEnter (e) {
      if (e.currentTarget && e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) return
      this.$emit('dragenter')
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
      this.$emit('dragover')
    },
    handleContentDragEnd (e) {
      this.$emit('dragend')
    },
    handleContentDragLeave (e) {
      if (e.currentTarget && e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) return
      this.pending = false
      this.$emit('dragleave')
    },
    handleContentDrop (e) {
      e.preventDefault()
      this.pending = false
      const actionType = ({
        top: 'insertBefore',
        bottom: 'insertAfter',
        body: 'append'
      })[this.pendingPosition]
      this.$emit('drop', e, actionType)
    }
  }
}
</script>
