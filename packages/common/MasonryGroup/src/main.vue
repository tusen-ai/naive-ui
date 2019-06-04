<template>
  <div
    ref="nv-masonry-group"
    class="nv-masonry-group"
  >
    <slot />
  </div>
</template>

<script>
import Masonry from 'masonry-layout'

export default {
  name: 'NvMasonryGroup',
  mounted () {
    const msry = new Masonry(this.$refs['nv-masonry-group'], {
      itemSelector: '.grid-item',
      gutter: 18,
      columnWidth: 299.5
    })
    msry.layout()
  }
}
</script>
