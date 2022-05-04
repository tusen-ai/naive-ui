<markdown>
# Loading
</markdown>

<template>
  <n-space>
    <n-switch loading />
    <n-switch
      :value="activeValue"
      :loading="loading"
      @update:value="handleChange"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const activeValue = ref(false)
    const loading = ref(false)
    return {
      activeValue,
      loading,
      handleChange (value: boolean) {
        loading.value = true
        setTimeout(() => {
          activeValue.value = value
          loading.value = false
        }, 2000)
      }
    }
  }
})
</script>
