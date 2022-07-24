<markdown>
# 位置

Affix 可以 `absolute` 或者 `fixed` 定位。你可能还需要写一些额外的 CSS 才能让达到例子的效果。 默认情况下位置是 `fixed`，因为大多数情况下，滚动的元素是 `document`。
</markdown>

<template>
  <div class="absolute-anchor-container">
    <div ref="containerRef" class="container">
      <div class="padding" />
      <div class="content">
        <div style="display: inline-block; width: 50%">
          <n-affix
            :trigger-top="50"
            position="absolute"
            :listen-to="() => containerRef"
          >
            <n-tag>顶部触发距离 50px</n-tag>
          </n-affix>
        </div>
        <div style="display: inline-block; width: 50%">
          <n-affix
            :trigger-bottom="60"
            position="absolute"
            :listen-to="() => containerRef"
          >
            <n-tag>底部触发距离 60px</n-tag>
          </n-affix>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const containerRef = ref<HTMLElement | undefined>(undefined)
    return {
      containerRef
    }
  }
})
</script>

<style>
.absolute-anchor-container {
  width: 100%;
  height: 200px;
  position: relative;
}

.container {
  height: 200px;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 3px;
  overflow: auto;
}

.padding {
  height: 150px;
  width: 100%;
  background-color: rgba(128, 128, 128, 0.15);
}

.content {
  height: 600px;
}
</style>
