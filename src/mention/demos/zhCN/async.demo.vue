<markdown>
# 远程加载

异步加载选项。
</markdown>

<script lang="ts" setup>
import type { MentionOption } from 'naive-ui'
import { ref } from 'vue'

const options = ref<MentionOption[]>([])
const loading = ref(false)
let searchTimerId: number | null = null

function handleSearch(pattern: string, prefix: string) {
  if (searchTimerId !== null)
    clearTimeout(searchTimerId)
  console.log(pattern, prefix)
  loading.value = true
  searchTimerId = window.setTimeout(() => {
    options.value = [
      '它烫不了你的舌',
      '也烧不了你的口',
      '喝醉吧',
      '不要回头'
    ].map(v => ({
      label: pattern + v,
      value: pattern + v
    }))
    loading.value = false
  }, 1500)
}
</script>

<template>
  <n-mention
    :options="options"
    default-value="@"
    :loading="loading"
    @search="handleSearch"
  />
</template>
