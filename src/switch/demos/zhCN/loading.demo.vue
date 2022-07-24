<markdown>
# 加载中
</markdown>

<template>
  <n-space>
    <n-switch :rubber-band="false" loading />
    <n-switch
      :rubber-band="false"
      :value="active"
      :loading="loading"
      @update:value="handleUpdateValue"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const activeRef = ref(false)
    const loadingRef = ref(false)
    return {
      active: activeRef,
      loading: loadingRef,
      handleUpdateValue (value: boolean) {
        loadingRef.value = true
        setTimeout(() => {
          activeRef.value = value
          loadingRef.value = false
        }, 2000)
      }
    }
  }
})
</script>
