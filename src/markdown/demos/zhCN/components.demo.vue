<markdown>
# 自定义 Markdown 组件
</markdown>

<script lang="ts" setup>
import type { Components } from 'vue-markdown-unified'
import { NImage } from 'naive-ui'
import { h, ref } from 'vue'

const options = {
  allowHtml: true
}

const markdownText = ref(`
![](https://picsum.photos/id/1/100/100)
`)

function renderImg(props: any) {
  return h(NImage, { ...props })
}

const components = {
  img: renderImg
} as Components
</script>

<template>
  <n-markdown
    :content="markdownText"
    :components="components"
    v-bind="options"
  />
</template>
