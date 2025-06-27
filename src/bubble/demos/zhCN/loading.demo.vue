<markdown>
# 加载状态

通过 `loading` 参数控制加载状态
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)
const content = 'hello world  !'
</script>

<template>
  <n-space vertical>
    <n-bubble :content="content" :loading="loading" />

    <n-bubble :content="content" :loading="loading">
      <template #loading>
        <div>loading...</div>
      </template>
    </n-bubble>

    <n-bubble :content="content" />

    <n-space>
      状态：
      <n-switch v-model:value="loading" />
    </n-space>
  </n-space>
</template>
