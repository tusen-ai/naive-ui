<markdown>
# 懒加载

让图片进入视口再加载，两种使用方式：一种是单独使用 `lazy` 属性，则将设置为原生[HTMLImageElement.loading](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/loading) 的属性值；
另一种方式是配合 `intersection-observer-options` 配置，将采用 [IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver) API 实现懒加载。
</markdown>

<template>
  <n-p>单独设置 <n-text code>
    lazy
  </n-text> 属性</n-p>
  <n-image
    lazy
    width="100"
    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
  />
  <n-p>
    <n-text code>
      lazy
    </n-text> 属性配合
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
            background-color: #0001;
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
