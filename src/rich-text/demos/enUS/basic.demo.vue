<markdown>
# Basic
</markdown>

<script lang="ts" setup>
import { DompurifyConfig } from 'naive-ui';

const html = `<h2>Text Formatting</h2>
<p>This is <strong>bold text</strong>, and this is <em>italic text</em>.</p>
<p>You can also combine <strong><em>bold and italic</em></strong> formatting.</p>`

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