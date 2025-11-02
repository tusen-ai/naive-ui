<markdown>
# Use as tag input box

Use `tag` and `:show="false"` to use select as a tag input box.
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
    placeholder="Input, press enter to create tag"
    :show-arrow="false"
    :show="false"
  />
</template>
