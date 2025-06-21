<markdown>
# 作为 Tag 框输入使用

使用 `tag` 和 `:show="false"` 来作为 Tag 框输入使用。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const multipleSelectValue = ref(null)
</script>

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
