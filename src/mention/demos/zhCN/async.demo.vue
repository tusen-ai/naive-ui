<markdown>
# 远程加载

异步加载选项。
</markdown>

<script lang="ts">
import type { MentionOption } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const optionsRef = ref<MentionOption[]>([])
    const loadingRef = ref(false)
    let searchTimerId: number | null = null
    return {
      options: optionsRef,
      loading: loadingRef,
      handleSearch(pattern: string, prefix: string) {
        if (searchTimerId !== null)
          clearTimeout(searchTimerId)
        console.log(pattern, prefix)
        loadingRef.value = true
        searchTimerId = window.setTimeout(() => {
          optionsRef.value = [
            '它烫不了你的舌',
            '也烧不了你的口',
            '喝醉吧',
            '不要回头'
          ].map(v => ({
            label: pattern + v,
            value: pattern + v
          }))
          loadingRef.value = false
        }, 1500)
      }
    }
  }
})
</script>

<template>
  <n-mention
    :options="options"
    default-value="@"
    :loading="loading"
    @search="handleSearch"
  />
</template>
