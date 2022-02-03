<markdown>
# 作为 Tag 框输入使用

使用 `tag` 和 `:show="false"` 来作为 Tag 框输入使用。
</markdown>

<template>
  <n-select
    v-model:value="multipleSelectValue"
    filterable
    multiple
    tag
    placeholder="输入，按回车确认"
    :show-arrow="false"
    :show="false"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      multipleSelectValue: ref(null),
      selectValue: ref(null)
    }
  }
})
</script>
