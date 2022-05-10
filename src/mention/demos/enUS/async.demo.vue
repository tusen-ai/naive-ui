<markdown>
# Load remote options

Load options asynchronously.
</markdown>

<template>
  <n-mention
    :options="options"
    default-value="@"
    :loading="loading"
    @search="handleSearch"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MentionOption } from 'naive-ui'

export default defineComponent({
  setup () {
    const optionsRef = ref<MentionOption[]>([])
    const loadingRef = ref(false)
    let searchTimerId: number | null = null
    return {
      options: optionsRef,
      loading: loadingRef,
      handleSearch (pattern: string, prefix: string) {
        if (searchTimerId !== null) clearTimeout(searchTimerId)
        console.log(pattern, prefix)
        loadingRef.value = true
        searchTimerId = window.setTimeout(() => {
          optionsRef.value = [
            'We',
            'all',
            'live',
            'in',
            'a',
            'yellow',
            'submarine'
          ].map((v) => ({
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
