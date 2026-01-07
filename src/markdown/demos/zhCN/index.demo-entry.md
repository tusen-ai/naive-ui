# Markdown

运行时 Markdown 渲染组件。

## 演示

```demo
basic.vue
hljs.vue
security.vue
```

## API

### Markdown Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| source | `string` | `''` | Markdown 源字符串。 |
| sanitize | `boolean` | `true` | 是否清理链接与图片中的不安全 URL，并转义原始 HTML。 |
| sanitizeHtml | `(html: string) => string` | `undefined` | 对原始 HTML 进行净化并渲染（仅在 `sanitize` 为 `true` 时生效）。 |
| hljs | `Hljs` | `undefined` | highlight.js 实例。 |
