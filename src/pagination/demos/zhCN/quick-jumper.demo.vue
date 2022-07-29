<markdown>
# 快速跳跃

自定义跳至的内容（按 `Enter` 进行快速跳跃）。

也可以通过 `trigger-quick-jump-on-blur` 自定义失焦是否触发快速跳跃。
</markdown>

<template>
  <n-space>
    <n-switch v-model:value="trigger">
      <template #checked>
        失焦跳转
      </template>
      <template #unchecked>
        失焦不跳转
      </template>
    </n-switch>
    <n-pagination
      v-model:page="page"
      :page-count="100"
      :trigger-quick-jump-on-blur="trigger"
      show-quick-jumper
    >
      <template #goto>
        请回答
      </template>
    </n-pagination>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      page: ref(2),
      trigger: ref(false)
    }
  }
})
</script>
