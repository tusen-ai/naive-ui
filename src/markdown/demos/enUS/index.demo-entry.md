# Markdown

`Markdown` is a Markdown rendering component that uses `remark` for internal rendering.

Available since `NEXT_VERSION`.

## Prequisites

<n-alert title="Attention" type="warning" style="margin-bottom: 16px;" :bordered="false">
Due to package size considerations, Naive UI does not include Markdown rendering logic. If you need to use Markdown, make sure you have set  `vue-markdown-unified` before use.
</n-alert>

The following markdown shows how to set vue-markdown-unified of Markdown.

```html
<template>
  <n-config-provider :markdown="markdown">
    <my-app />
  </n-config-provider>
</template>

<script setup>
  import { defineComponent } from 'vue'
  import { markdown } from 'vue-markdown-unified'
</script>
```

## Demos

```demo
basic.vue
github-syntax-guide.vue
components.vue
code.vue
katex.vue
```

## API

### Markdown Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| content | `string` | `undefined` | Markdown content to render | NEXT_VERSION |
| allowHtml | `boolean` | `false` | Whether to allow HTML in markdown content | NEXT_VERSION |
| enableLatex | `boolean` | `false` | Enable LaTeX math expressions | NEXT_VERSION |
| isBreaks | `boolean` | `false` | support hard breaks without needing spaces or escapes | NEXT_VERSION |
| rehypePlugins | `Pluggable[]` | `true` | Additional rehype plugins | NEXT_VERSION |
| remarkPlugins | `Pluggable[]` | `true` | Additional remark plugins | NEXT_VERSION |
| components | `Components ` | - | Custom components for markdown elements | NEXT_VERSION |
