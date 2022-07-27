<markdown>
# 基础用法

Affix 有 `trigger-top`、`top`、`trigger-bottom` 和 `bottom` 属性。`trigger-top` 是顶部固定的触发距离，`top` 是在触发顶部固定之后 CSS 的 `top` 值。`trigger-bottom` 和 `bottom` 类似。
</markdown>

<template>
  <div ref="containerRef" class="container">
    <div class="padding" />
    <div class="content">
      <n-grid :cols="2">
        <n-gi :span="1">
          <n-affix :top="120" :trigger-top="60" :listen-to="() => containerRef">
            <n-tag>顶部触发距离 60px</n-tag>
          </n-affix>
        </n-gi>
        <n-gi :span="1">
          <n-affix
            :bottom="120"
            :trigger-bottom="60"
            :listen-to="() => containerRef"
          >
            <n-tag>底部触发距离 60px</n-tag>
          </n-affix>
        </n-gi>
      </n-grid>
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
.container {
  width: 100%;
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
