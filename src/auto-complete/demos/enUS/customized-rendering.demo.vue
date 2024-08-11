<markdown>
# Customized rendering

Use `render-label` to customize label rendering.
</markdown>

<script lang="ts">
import type { VNodeChild } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'
import type { SelectOption } from 'naive-ui'
import { NTag } from 'naive-ui'

export default defineComponent({
  setup() {
    const valueRef = ref('')
    return {
      renderLabel: (option: SelectOption): VNodeChild => [
        option.label as string,
        ' ',
        h(NTag, { size: 'small', type: 'info' }, { default: () => 'Email' })
      ],
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
  <n-auto-complete
    v-model:value="value"
    :options="options"
    placeholder="Email"
    :render-label="renderLabel"
  />
</template>
