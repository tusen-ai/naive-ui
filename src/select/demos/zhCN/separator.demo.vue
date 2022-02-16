<markdown>
# 作为带分隔符的 Tag 框输入使用

使用 `tag` 和 `:show="false"` `separator` 来作为带分隔符的 Tag 框输入使用。
</markdown>

<template>
  <n-select
    v-model:value="multipleSelectValue"
    filterable
    multiple
    tag
    placeholder="使用 ; 作为分隔符"
    :separator="';'"
    :show-arrow="false"
    :show="false"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      multipleSelectValue: ref(null)
    }
  }
})
</script>
