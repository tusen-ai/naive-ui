# Markdown

Markdown renderer at runtime.

<n-alert title="Note" type="warning" style="margin-bottom: 16px;" :bordered="false">
  Due to package size, Naive UI doesn't include unified/remark. If you want to use NMarkdown, make sure you have setup a markdown processor before using it.
</n-alert>

The following code shows how to setup a markdown processor for NMarkdown.

```html
<template>
  <n-config-provider :markdown="markdown">
    <my-app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import { unified } from 'unified'
  import remarkParse from 'remark-parse'

  export default defineComponent({
    setup() {
      const markdown = unified().use(remarkParse)
      return {
        markdown
      }
    }
  })
</script>
```

## Demos

```demo
basic.vue
hljs.vue
security.vue
```

## API

### Markdown Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| source | `string` | `''` | Markdown source. |
| sanitize | `boolean` | `true` | Whether to sanitize unsafe URLs in links/images and escape raw HTML. |
| sanitizeHtml | `(html: string) => string` | `undefined` | Sanitizes raw HTML and renders it (only works when `sanitize` is `true`). |
| hljs | `Hljs` | `undefined` | highlight.js instance. |
| markdown | `MarkdownProcessor` | `undefined` | Markdown processor, overrides the one from `NConfigProvider`. |
