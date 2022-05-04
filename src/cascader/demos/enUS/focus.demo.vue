<markdown>
# Focus & blur manually
</markdown>

<template>
  <n-space item-style="display: flex; align-item: center;">
    <n-button @click="handleClick">
      Focus then blur in 1 second
    </n-button>
    <n-cascader ref="cascaderInstRef" style="width: 200px" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CascaderInst } from 'naive-ui'

export default defineComponent({
  setup () {
    const cascaderInstRef = ref<CascaderInst | null>(null)
    return {
      handleClick () {
        cascaderInstRef.value?.focus()
        setTimeout(() => {
          cascaderInstRef.value?.blur()
        }, 1000)
      },
      cascaderInstRef
    }
  }
})
</script>
