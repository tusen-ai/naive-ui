<markdown>
# Load remote options

Load options asynchronously.
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
    options.value = ['We', 'all', 'live', 'in', 'a', 'yellow', 'submarine'].map(
      v => ({
        label: pattern + v,
        value: pattern + v
      })
    )
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
