<markdown>
# 出现位置

虽然从鼠标位置出现的动画看起来很酷，但是我们有时也想要一些朴实无华的从屏幕中间弹出来的动画。这时你可以将 `transform-origin` 设为 `'center'`。
</markdown>

<template>
  <n-button @click="showModal = true">
    没什么的
  </n-button>
  <n-modal v-model:show="showModal" transform-origin="center">
    <n-card
      style="width: 600px"
      title="自愿"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        按需
      </template>
      原则
      <template #footer>
        支持一下
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      showModal: ref(false)
    }
  }
})
</script>
