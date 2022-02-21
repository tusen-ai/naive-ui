<markdown>
# Group
</markdown>

<template>
  <n-auto-complete
    v-model:value="value"
    :options="options"
    placeholder="Email"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup () {
    const valueRef = ref('')
    return {
      value: valueRef,
      options: computed(() => {
        return [
          ['Google', '@gmail.com'],
          ['Netease', '@163.com'],
          ['Tencent', '@qq.com']
        ].map((emailInfo) => {
          return {
            type: 'group',
            label: emailInfo[0],
            key: emailInfo[0],
            children: [valueRef.value.split('@')[0] + emailInfo[1]]
          }
        })
      })
    }
  }
})
</script>
