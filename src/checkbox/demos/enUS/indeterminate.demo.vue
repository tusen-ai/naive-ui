<markdown>
# Indeterminate
</markdown>

<template>
  <n-space item-style="display: flex;" align="center">
    <n-checkbox
      v-model:checked="value"
      :indeterminate="indeterminate"
    >
      checkbox
    </n-checkbox>
    <n-checkbox v-model:checked="value" :indeterminate="indeterminate" />
    <n-checkbox
      v-model:checked="value"
      :indeterminate="indeterminate"
      disabled
    />
    <n-button size="small" @click="value = !value">
      Check
    </n-button>
    <n-button
      size="small"
      @click="indeterminate = !indeterminate"
    >
      Indeterminate
    </n-button>
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
