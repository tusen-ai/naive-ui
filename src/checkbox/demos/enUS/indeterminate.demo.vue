<markdown>
# Indeterminate
</markdown>

<template>
  <n-space item-style="display: flex;" align="center">
    <n-checkbox v-model:checked="value" :indeterminate="indeterminate">
      Checkbox
    </n-checkbox>
    <n-checkbox v-model:checked="value" :indeterminate="indeterminate" />
    <n-checkbox
      v-model:checked="value"
      :indeterminate="indeterminate"
      disabled
    />
    <n-switch v-model:value="value">
      <template #checked>
        checked
      </template>
      <template #unchecked>
        Unchecked
      </template>
    </n-switch>
    <n-switch v-model:value="indeterminate">
      <template #checked>
        Indeterminate
      </template>
      <template #unchecked>
        Not indeterminate
      </template>
    </n-switch>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(false),
      indeterminate: ref(false)
    }
  }
})
</script>
