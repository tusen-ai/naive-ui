<markdown>
# 自定义触发字符

使用 `prefix` 设定触发字符。
</markdown>

<script lang="ts" setup>
import type { MentionOption } from 'naive-ui'
import { ref } from 'vue'

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

const options = ref<MentionOption[]>([])

function handleSearch(_: string, prefix: string) {
  if (prefix === '@') {
    options.value = atOptions
  }
  else {
    options.value = sharpOptions
  }
}
</script>

<template>
  <n-mention :options="options" :prefix="['@', '#']" @search="handleSearch" />
</template>
