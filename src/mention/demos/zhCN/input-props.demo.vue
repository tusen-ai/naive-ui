<markdown>
# Input props

<n-alert type="warning">
  Props and defaults from <n-code>n-mention</n-code> will override props set with <n-code>input-props</n-code>. To set <n-code>placeholder</n-code> or <n-code>loading</n-code>, set it directly on <n-code>n-mention</n-code>.
</n-alert>
</markdown>

<template>
  <n-mention
    :options="options"
    :loading="loading"
    :input-props="{ rows: 5, 'show-count': true }"
    type="textarea"
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
