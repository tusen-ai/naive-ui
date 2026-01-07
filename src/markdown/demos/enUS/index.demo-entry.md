# Markdown

Markdown renderer at runtime.

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
