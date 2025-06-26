# Markdown

`Markdown` 是一个Markdown 渲染组件，内部使用remark渲染。

自 `NEXT_VERSION` 开始提供。

<n-alert title="注意" type="warning" style="margin-bottom: 16px;" :bordered="false">
  由于包体积原因，Naive UI 不内置 unified。如果你需要使用公式组件，请确保你在使用之前已经设定了 unified。
</n-alert>

## 演示

```demo
basic.vue
github-syntax-guide.vue
code.vue
katex.vue
components.vue
```

## API

### Markdown Props

| 名称      | 类型       | 默认值      | 说明             | 版本         |
| --------- | ---------- | ----------- | ---------------- | ------------ |
| content   | `string`   | `undefined` | Markdown content to render | NEXT_VERSION |
| allowHtml | `boolean` | `false` | Whether to allow HTML in markdown content | NEXT_VERSION |
| enableLatex | `boolean` | `false` | Enable LaTeX math expressions | NEXT_VERSION |
| isBreaks | `boolean` | `false` | support hard breaks without needing spaces or escapes | NEXT_VERSION |
| rehypePlugins | `Pluggable[]` | `true` | Additional rehype plugins | NEXT_VERSION |
| remarkPlugins | `Pluggable[]` | `true` | Additional remark plugins | NEXT_VERSION |
| components | `Components ` | - | Custom components for markdown elements | NEXT_VERSION |