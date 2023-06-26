<markdown>
# Lazy load

Load the images only after they enter the viewport. There are two ways to use it: one is to use the `lazy` property alone, which will be set to the value of the [HTMLImageElement.loading](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading) property, and the other is to use `lazy` together with the `intersection-observer-options` configuration to implement lazy loading using the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) API.
</markdown>

<template>
  <n-p>use<n-text code>
    lazy
  </n-text> along</n-p>
  <n-image
    lazy
    width="100"
    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
  />
  <n-p>
    use <n-text code>
      lazy
    </n-text> with
    <n-text code>
      intersection-observer-options
    </n-text>
  </n-p>
  <div
    id="image-scroll-container"
    style="
      overflow: auto;
      height: 100px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    "
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
    >
      <template #placeholder>
        <div
          style="
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #8882;
          "
        >
          Loading
        </div>
      </template>
    </n-image>
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
