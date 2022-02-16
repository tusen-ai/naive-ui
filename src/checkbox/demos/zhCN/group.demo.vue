<markdown>
# 选项组
</markdown>

<template>
  <n-checkbox-group v-model:value="cities">
    <n-space item-style="display: flex;">
      <n-checkbox value="Beijing" label="北京" />
      <n-checkbox value="Shanghai" label="上海" />
      <n-checkbox value="Guangzhou" label="广州" />
      <n-checkbox value="Shenzen" label="深圳" />
    </n-space>
  </n-checkbox-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      cities: ref(null)
    }
  }
})
</script>
