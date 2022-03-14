<markdown>
# 作为带分隔符的 Tag 框输入使用

使用 `tag` 和 `separators` 来作为带分隔符的 Tag 框输入使用。
</markdown>

<template>
  <n-space vertical>
    <n-switch v-model:value="show" />
    <n-select
      v-model:value="multipleSelectValue"
      filterable
      multiple
      tag
      placeholder="使用 ; 作为分隔符"
      :separators="separators"
      :show="show"
      :show-arrow="false"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const show = ref(false)
    const separators = [',', ';']
    return {
      show,
      separators,
      multipleSelectValue: ref(null)
    }
  }
})
</script>
