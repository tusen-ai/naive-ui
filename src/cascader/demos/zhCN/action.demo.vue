<markdown>
# 插槽

有人要在级联菜单里用这些插槽吗？
</markdown>

<template>
  <n-cascader v-model:value="value" placeholder="没啥用的值" :options="options">
    <template #action>
      站在能分割世界的桥
    </template>
    <template #arrow>
      <flash16-regular />
    </template>
  </n-cascader>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CascaderOption } from 'naive-ui'
import Flash16Regular from '@vicons/fluent/Flash16Regular'

function getOptions (depth = 2, iterator = 1, prefix = '') {
  const length = 12
  const options: CascaderOption[] = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `${i}`,
        label: `${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, '' + String(i))
      })
    } else if (iterator === depth) {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
        disabled: i % 5 === 0
      })
    } else {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${prefix}-${i}`)
      })
    }
  }
  return options
}

export default defineComponent({
  components: {
    Flash16Regular
  },
  setup () {
    return {
      value: ref(null),
      options: getOptions()
    }
  }
})
</script>
