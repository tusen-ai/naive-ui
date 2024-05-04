<markdown>
# 部分选中
</markdown>

<template>
  <n-space item-style="display: flex;" align="center">
    <n-checkbox v-model:checked="value" :indeterminate="indeterminate">
      复选框
    </n-checkbox>
    <n-checkbox v-model:checked="value" :indeterminate="indeterminate" />
    <n-checkbox
      v-model:checked="value"
      :indeterminate="indeterminate"
      disabled
    />
    <n-switch v-model:value="value">
      <template #checked>
        选中
      </template>
      <template #unchecked>
        没选中
      </template>
    </n-switch>
    <n-switch v-model:value="indeterminate">
      <template #checked>
        部分选中
      </template>
      <template #unchecked>
        非部分选中
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
