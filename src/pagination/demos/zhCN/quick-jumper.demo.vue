<markdown>
# 快速跳跃

也可以自定义跳至的内容。
</markdown>

<template>
  <n-pagination v-model:page="page" :page-count="100" show-quick-jumper>
    <template #goto>
      请回答
    </template>
  </n-pagination>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      page: ref(2)
    }
  }
})
</script>
