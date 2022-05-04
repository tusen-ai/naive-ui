<markdown>
# Size

Cascader has `small`, `medium` and `large` sizes.
</markdown>

<template>
  <n-space vertical>
    <n-cascader
      v-model:value="value"
      placeholder="Meaningless values"
      :options="options"
      check-strategy="child"
      size="small"
    />
    <n-cascader
      v-model:value="value"
      placeholder="Meaningless values"
      :options="options"
      check-strategy="child"
      size="medium"
    />
    <n-cascader
      v-model:value="value"
      placeholder="Meaningless values"
      :options="options"
      check-strategy="child"
      size="large"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CascaderOption } from 'naive-ui'

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
  setup () {
    return {
      value: ref(null),
      options: getOptions()
    }
  }
})
</script>
