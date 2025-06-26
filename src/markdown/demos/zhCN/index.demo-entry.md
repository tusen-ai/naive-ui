# Markdown

`Markdown` 是一个 Markdown 渲染组件，内部使用 `remark` 渲染。

自 `NEXT_VERSION` 开始提供。

<n-alert title="注意" type="warning" style="margin-bottom: 16px;" :bordered="false">
  由于包体积原因，Naive UI 不内置 Markdown 渲染逻辑。如果你需要使用 Markdown 组件，请确保你在使用之前已经安装了 vue-markdown-unified。
</n-alert>

`pnpm i vue-markdown-unified`

## 演示

```demo
basic.vue
github-syntax-guide.vue
components.vue
code.vue
katex.vue
```

## API

### Markdown Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| content | `string` | `undefined` | 要展示的文本内容 | NEXT_VERSION |
| allowHtml | `boolean` | `false` | 是否允许在markdown内容中使用HTML | NEXT_VERSION |
| enableLatex | `boolean` | `true` | 启用LaTeX数学表达式 | NEXT_VERSION |
| isBreaks | `boolean` | `false` | 支持硬中断，无需空格或转义 | NEXT_VERSION |
| rehypePlugins | `Pluggable[]` | `true` | 其他 rehype 插件 | NEXT_VERSION |
| remarkPlugins | `Pluggable[]` | `true` | 其他remark插件 | NEXT_VERSION |
| components | `Components ` | - | Markdown 元素的自定义组件 | NEXT_VERSION |
