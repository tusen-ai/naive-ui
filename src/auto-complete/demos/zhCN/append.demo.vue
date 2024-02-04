<markdown>
# 追加模式

在选中选项后追加到输入框中，而不是直接覆盖，配合 get-show 使用。
</markdown>

<template>
  <n-space vertical>
    <n-auto-complete
      v-model:value="value"
      :options="options"
      :append="false"
      placeholder="选择后覆盖"
    />
    <n-auto-complete
      v-model:value="appendValue"
      :options="appendOptions"
      :append="true"
      :get-show="getShow"
      placeholder="配合 get-show 选择后追加"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup () {
    const valueRef = ref('')
    const appendValueRef = ref('')
    return {
      value: valueRef,
      options: computed(() => {
        return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
          const value = valueRef.value === null ? '' : valueRef.value
          const prefix = value.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
        })
      }),
      appendValue: appendValueRef,
      appendOptions: computed(() => {
        return ['gmail.com', '163.com', 'qq.com'].map((suffix) => {
          return {
            label: suffix,
            value: suffix
          }
        })
      }),
      getShow: (value: string) => {
        if (value.endsWith('@')) {
          return true
        }
        return false
      }
    }
  }
})
</script>
