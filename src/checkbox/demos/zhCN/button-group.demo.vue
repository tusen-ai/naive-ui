<markdown>
# 按钮组

有的时候用按钮显得更优雅一点。
</markdown>

<template>
  <n-checkbox-group v-model:value="cities" is-button-group>
    <n-checkbox-button value="Beijing" label="北京" />
    <n-checkbox-button value="Shanghai" label="上海" />
    <n-checkbox-button value="Guangzhou" label="广州" />
    <n-checkbox-button value="Shenzen" label="深圳" />
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
