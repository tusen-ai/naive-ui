<markdown>
# Markdown渲染

参考 NMarkdown 组件
</markdown>

<script lang="ts" setup>
import 'vue-markdown-unified/dist/themes/prism.min.css'
</script>

<template>
    <n-bubble :content="`#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\``" isMarkdown />
</template>
