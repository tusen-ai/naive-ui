<markdown>
# 自定义内容
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const customValue = ref([
  {
    isCheck: true,
    num: 1,
    string: '一个字符串'
  }
])

function onCreate() {
  return {
    isCheck: false,
    num: 1,
    string: '一个字符串'
  }
}
</script>

<template>
  <n-dynamic-input v-model:value="customValue" :on-create="onCreate">
    <template #create-button-default>
      随便搞点啥
    </template>
    <template #default="{ value }">
      <div style="display: flex; align-items: center; width: 100%">
        <n-checkbox
          v-model:checked="value.isCheck"
          style="margin-right: 12px"
        />
        <n-input-number
          v-model:value="value.num"
          style="margin-right: 12px; width: 160px"
        />
        <n-input v-model:value="value.string" type="text" />
      </div>
    </template>
  </n-dynamic-input>
  <pre>{{ JSON.stringify(customValue, null, 2) }}</pre>
</template>
