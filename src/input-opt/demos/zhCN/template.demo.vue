<markdown>
# 模板插槽

使用您自己的 UI 元素定义模板，并绑定到提供的事件和属性，以替换默认设计。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('654321')
</script>

<template>
  <n-input-opt v-model:value="value" style="width: 300px">
    <template #default="{ attrs, index }">
      <n-input v-bind="attrs" placeholder="" />
      <span v-if="index === 1" style="padding-left: 4px; padding-right: 4px">
        <i>-</i>
      </span>
      <div v-if="index === 3" style="padding-left: 4px; padding-right: 4px">
        <i>-</i>
      </div>
    </template>
  </n-input-opt>
</template>
