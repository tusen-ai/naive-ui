<markdown>
# 输入框属性

<n-alert type="warning">
`n-mention` 中的属性和默认值将覆盖在 `input-props` 中重复设置的，因此要设置 `placeholder` 或 `disabled`，请直接在 `n-mention` 上设置
</n-alert>
</markdown>

<template>
  <n-mention
    :options="options"
    :loading="loading"
    :input-props="{ rows: 5, 'show-count': true, loading: loading }"
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
