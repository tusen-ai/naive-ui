<markdown>
# Focus & blur manually
</markdown>

<template>
  <n-space item-style="display: flex; align-item: center;">
    <n-button @click="handleClick">
      Focus then blur in 1 second
    </n-button>
    <n-select ref="selectInstRef" style="width: 200px" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { SelectInst } from 'naive-ui'

export default defineComponent({
  setup () {
    const selectInstRef = ref<SelectInst | null>(null)
    return {
      handleClick () {
        selectInstRef.value?.focus()
        setTimeout(() => {
          selectInstRef.value?.blur()
        }, 1000)
      },
      selectInstRef
    }
  }
})
</script>
