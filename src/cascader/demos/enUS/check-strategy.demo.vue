<markdown>
# Setting check strategy

Set the way to show checked options. `all` means showing all checked nodes. `parent` means showing all checked parent nodes when all child node are checked. `child` means showing all child nodes.
</markdown>

<template>
  <n-space vertical>
    <n-radio-group v-model:value="checkStrategy">
      <n-radio-button value="all">
        All
      </n-radio-button>
      <n-radio-button value="parent">
        Parent
      </n-radio-button>
      <n-radio-button value="child">
        Child
      </n-radio-button>
    </n-radio-group>

    <n-cascader
      multiple
      cascade
      :check-strategy="checkStrategy"
      :options="options"
      :default-value="['1-1-1-1', '1-1-2-1', '1-1-2-2', '1-1-2-3']"
      @update:value="handleUpdateValue"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CascaderOption } from 'naive-ui'

function getOptions (depth = 4, iterator = 1, prefix = '') {
  const length = 3
  const options: CascaderOption[] = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `${i}`,
        label: `${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, '' + i)
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
      checkStrategy: ref<'all' | 'child' | 'parent'>('all'),
      options: getOptions(),
      handleUpdateValue: (values: string | string[]) => {
        console.log(values)
      }
    }
  }
})
</script>
