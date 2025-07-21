<markdown>
# 菜单宽度

菜单宽度可以跟随菜单内容（这种情况下无法进行虚拟滚动）。
</markdown>

<script lang="ts" setup>
import type { CascaderOption } from 'naive-ui'
import { ref } from 'vue'

function getOptions(depth = 2, iterator = 1, prefix = '') {
  const length = 12
  const options: CascaderOption[] = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `${i}`,
        label: `Everybody\'s Got Something to Hide Except Me and My Monkey`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${String(i)}`)
      })
    }
    else if (iterator === depth) {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
        disabled: i % 5 === 0
      })
    }
    else {
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

const value = ref(null)
const options = getOptions()
</script>

<template>
  <n-space vertical>
    <n-cascader
      v-model:value="value"
      placeholder="没啥用的值"
      :options="options"
      check-strategy="child"
      :consistent-menu-width="false"
      :virtual-scroll="false"
    />

    <n-cascader
      v-model:value="value"
      filterable
      placeholder="没啥用的值"
      :options="options"
      check-strategy="child"
      :consistent-menu-width="false"
      :virtual-scroll="false"
    />
  </n-space>
</template>
