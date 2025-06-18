<markdown>
# 基础用法
</markdown>

<script lang="ts" setup>
import { DompurifyConfig } from 'naive-ui';

const html = `<h2>文本格式化</h2>
<p>这是<strong>加粗文本</strong>，这是<em>斜体文本</em>。</p>
<p>你也可以组合使用<strong><em>加粗和斜体</em></strong>格式。</p>`

const options: DompurifyConfig = {
    ALLOWED_TAGS: ['b', 'i', 'u', 'a', 'p', 'div', 'span', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'title', 'target', 'class'],
    FORBID_ATTR: ['on*', 'style'],
    ALLOWED_URI_REGEXP: /^(https?|mailto|ftp):/,
}
</script>

<template>
    <n-rich-text :content="html"  :options="options" />
</template>