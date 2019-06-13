<template>
  <div
    ref="n-masonry-group"
    class="n-masonry-group"
  >
    <slot />
  </div>
</template>

<script>
import Masonry from 'masonry-layout'

export default {
  name: 'NMasonryGroup',
  mounted () {
    const msry = new Masonry(this.$refs['n-masonry-group'], {
      itemSelector: '.grid-item',
      gutter: 18,
      columnWidth: 299.5
    })
    msry.layout()
  }
}
</script>
