<markdown>
# 调整位置

通过固定定位设定 Modal 的位置。
</markdown>

<template>
  <n-button @click="showModal = true">
    来吧
  </n-button>
  <n-modal v-model:show="showModal">
    <n-card
      title="模态框"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      style="width: 600px; position: fixed; right: 100px; bottom: 100px"
    >
      <template #header-extra>
        噢！
      </template>
      内容
      <template #footer>
        尾部
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
