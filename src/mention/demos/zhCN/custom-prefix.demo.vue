<markdown>
# 自定义触发字符

使用 `prefix` 设定触发字符。
</markdown>

<template>
  <n-mention :options="options" :prefix="['@', '#']" @search="handleSearch" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MentionOption } from 'naive-ui'

export default defineComponent({
  setup () {
    const atOptions = [
      {
        label: '07akioni',
        value: '07akioni'
      },
      {
        label: 'star-kirby',
        value: 'star-kirby'
      },
      {
        label: '广东路',
        value: '广东路'
      },
      {
        label: '颐和园路5号',
        value: '颐和园路5号'
      }
    ]
    const sharpOptions = [
      {
        label: '它烫不了你的舌',
        value: '它烫不了你的舌'
      },
      {
        label: '也烧不了你的口',
        value: '也烧不了你的口'
      },
      {
        label: '喝醉吧',
        value: '喝醉吧'
      },
      {
        label: '不要回头',
        value: '不要回头'
      }
    ]
    const optionsRef = ref<MentionOption[]>([])
    return {
      options: optionsRef,
      handleSearch (_: string, prefix: string) {
        if (prefix === '@') {
          optionsRef.value = atOptions
        } else {
          optionsRef.value = sharpOptions
        }
      }
    }
  }
})
</script>
