<markdown>
# custom Markdown components
</markdown>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { NImage } from 'naive-ui'
import { Components } from 'vue-markdown-unified'

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
