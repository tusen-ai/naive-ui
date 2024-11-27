<markdown>
  # 吸附偏移

  设置 `snap-to-center` 后，启用中间吸附
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      snapToCenter: ref(false)
    }
  }
})
</script>

<template>
  <n-flex align="center">
    <n-switch v-model:value="snapToCenter" />

    <span> 开启中心吸附 </span>

    <n-split
      direction="horizontal"
      :snap-to-center="snapToCenter"
      style="height: 200px"
      :snap-offset="75"
    >
      <template #1>
        Pane 1
      </template>
      <template #2>
        Pane 2
      </template>
    </n-split>
  </n-flex>
</template>
