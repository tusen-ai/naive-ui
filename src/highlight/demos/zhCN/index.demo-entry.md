# 高亮文本 Highlight

用过搜索引擎的都知道这个是做什么的。

`2.40.0` 版本开始提供该组件。

## 演示

```demo
basic.vue
style.vue
case-sensitive.vue
component.vue
```

## API

### Highlight Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| auto-espace | `boolean` | `true` | 自动转义。默认情况下，`patterns` 中的元素会被转化为正则表达式进行匹配，这个过程中需要进行自动转义，正则表达式最终匹配的是元素的字面内容，例如 `\(` 匹配的就是 `\(`。如果你需要 `n-highlight` 组件去匹配使用 `patterns` 中元素本身构造的正则表达式，例如 `\(` 匹配的是 `(`，则可以设为 `false`。如果你看不懂这些，不要改这个设置。 | 2.40.0 |
| case-sensitive | `boolean` | `false` | 区分大小写 | 2.40.0 |
| highlight-class | `string` | `undefined` | 高亮内容的类名 | 2.40.0 |
| highlight-style | `Object \| string` | `undefined` | 高亮内容的样式 | 2.40.0 |
| highlight-tag | `string` | `'mark'` | 高亮内容的 HTML 元素类型 | 2.40.0 |
| patterns | `string[]` | `undefined` | 需要高亮的文本内容 | 2.40.0 |
| text | `string` | `undefined` | 文本 | 2.40.0 |
