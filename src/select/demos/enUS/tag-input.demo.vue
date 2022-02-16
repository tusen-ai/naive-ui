<markdown>
# Use as tag input box

Use `tag` and `:show="false"` to use select as a tag input box.
</markdown>

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
