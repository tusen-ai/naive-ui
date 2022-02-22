<markdown>
# Multiple

</markdown>
<template>
  <n-space vertical>
    <n-space>
      <n-space>
        <n-switch v-model:value="checkStrategyIsChild" />Child Check Strategy
      </n-space>
      <n-space><n-switch v-model:value="cascade" />Cascade</n-space>
      <n-space><n-switch v-model:value="showPath" />Show Path</n-space>
      <n-space><n-switch v-model:value="hoverTrigger" />Hover Trigger</n-space>
      <n-space><n-switch v-model:value="filterable" />Filterable</n-space>
      <n-space>
        <n-switch v-model:value="responsiveMaxTagCount" />Responsive MaxTagCount
      </n-space>
      <n-space>
        <n-switch
          v-model:value="clearFilterAfterSelect"
        />clearFilterAfterSelect
      </n-space>
    </n-space>
    <n-cascader
      v-model:value="value"
      multiple
      placeholder="Meaningless values"
      clearable
      :max-tag-count="responsiveMaxTagCount ? 'responsive' : undefined"
      :expand-trigger="hoverTrigger ? 'hover' : 'click'"
      :options="options"
      :cascade="cascade"
      :check-strategy="checkStrategyIsChild ? 'child' : 'all'"
      :show-path="showPath"
      :filterable="filterable"
      :clear-filter-after-select="clearFilterAfterSelect"
      @update:value="handleUpdateValue"
    />
  </n-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CascaderOption } from 'naive-ui'

function getOptions (depth = 3, iterator = 1, prefix = '') {
  const length = 12
  const options: CascaderOption[] = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `v-${i}`,
        label: `l-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, '' + String(i))
      })
    } else if (iterator === depth) {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0
      })
    } else {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
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
      checkStrategyIsChild: ref(true),
      cascade: ref(true),
      showPath: ref(true),
      hoverTrigger: ref(false),
      value: ref(null),
      filterable: ref(false),
      responsiveMaxTagCount: ref(true),
      clearFilterAfterSelect: ref(true),
      options: getOptions(),
      handleUpdateValue (value: string[], options: CascaderOption[]) {
        console.log(value, options)
      }
    }
  }
})
</script>
