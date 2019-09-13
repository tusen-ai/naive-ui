<template>
  <span
    class="n-tree-node-content"
    :class="{
      'n-tree-node-content--pending': pending,
      'n-tree-node-content--pending-bottom': pendingPosition === 'bottom',
      'n-tree-node-content--pending-body': pendingPosition === 'body',
      'n-tree-node-content--pending-top': pendingPosition === 'top'
    }"
    @dragleave="handleContentDragLeave"
    @dragstart="handleContentDragStart"
    @dragover="handleDragOverContent"
    @dragend="handleContentDragEnd"
  >
    <slot />
  </span>
</template>

<script>
export default {
  name: 'NTreeNodeContent',
  data () {
    return {
      pending: false
    }
  },
  methods: {
    handleContentDragStart (e) {
      console.log('drag start', e)
    },
    handleDragOverContent (e) {
      const el = this.$el
      this.pending = true
      console.log('drag over content', e)
    },
    handleContentDragEnd (e) {
      console.log('drag end', e)
    },
    handleContentDragLeave (e) {
      this.pending = false
    }
  }
}
</script>
