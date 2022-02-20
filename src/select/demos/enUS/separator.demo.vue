<markdown>
# Use separator to separate tags input

set `tag` and `:show="false"` and `separator`to use as tag input with `separator`.
</markdown>

<template>
  <n-select
    v-model:value="multipleSelectValue"
    filterable
    multiple
    tag
    placeholder="use ; as separator"
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
