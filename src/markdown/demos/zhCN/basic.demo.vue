<markdown>
# 基础用法
</markdown>

<script lang="ts" setup>
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { ref } from 'vue'

const markdownText = ref(`
![](https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg)
# This is an H1
## This is an H2
### This is an H3
#### This is an H4
##### This is an H5
`
)

function handleAddMd() {
  markdownText.value += `
  ### This is an H3
#### This is an H4
##### This is an H5`
}
</script>

<template>
    <n-button @click="handleAddMd" />
    <n-markdown
      :content="markdownText"
      :remark-rehype-options="{
        fontSize: '22px',
      }"
      :remark-plugins="[remarkGfm]"
      :rehype-plugins="[rehypeRaw]"
    />
</template>
