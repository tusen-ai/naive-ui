<markdown>
# Lazy load

You can use `lazy` to let image load after it enters viewport.
</markdown>

<template>
  <div
    id="image-scroll-container"
    style="overflow: auto; height: 100px; display: flex; flex-direction: column"
  >
    <n-image
      v-for="(src, index) in srcList"
      :key="index"
      width="100"
      height="100"
      lazy
      :src="src"
      :intersection-observer-options="{
        root: '#image-scroll-container'
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      srcList: [
        'https://picsum.photos/id/1/100/100',
        'https://picsum.photos/id/2/100/100',
        'https://picsum.photos/id/3/100/100',
        'https://picsum.photos/id/4/100/100',
        'https://picsum.photos/id/5/100/100',
        'https://picsum.photos/id/6/100/100',
        'https://picsum.photos/id/7/100/100',
        'https://picsum.photos/id/8/100/100',
        'https://picsum.photos/id/9/100/100',
        'https://picsum.photos/id/10/100/100'
      ]
    }
  }
})
</script>
