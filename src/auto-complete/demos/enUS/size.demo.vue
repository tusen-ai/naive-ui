<markdown>
# Size
</markdown>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const valueRef = ref('')
    return {
      value: valueRef,
      options: computed(() => {
        return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
          const prefix = valueRef.value.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
        })
      })
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-auto-complete
      v-model:value="value"
      :options="options"
      placeholder="Email"
      size="small"
    />
    <n-auto-complete
      v-model:value="value"
      :options="options"
      placeholder="Email"
      size="medium"
    />
    <n-auto-complete
      v-model:value="value"
      :options="options"
      placeholder="Email"
      size="large"
    />
  </n-space>
</template>
