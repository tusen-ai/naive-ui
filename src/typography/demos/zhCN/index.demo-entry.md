# 排印 Typography

Naive UI 提供了常用 HTML 标签的一些基本样式，以及对文本渲染提供帮助的组件。

排印是一门艺术。

## 演示

```demo
header
tags
text
```

## Props

### Text Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | `'default' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` |  |
| strong | `boolean` | `false` |  |
| italic | `boolean` | `false` |  |
| underline | `boolean` | `false` |  |
| delete | `boolean` | `false` |  |
| code | `boolean` | `false` |  |
| depth | `1 \| 2 \| 3 \| '1' \| '2' \| '3'` | `undefined` |  |
| tag | `string` | `undefined` | 需要被渲染为什么标签，在 `code` 和 `del` 设定的情况下不生效 |

### P Props

| 名称  | 类型                               | 默认值      | 说明 |
| ----- | ---------------------------------- | ----------- | ---- |
| depth | `1 \| 2 \| 3 \| '1' \| '2' \| '3'` | `undefined` |      |

### H1, H2, H3, H4, H5, H6 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| align-text | `boolean` | `false` |  |
| type | `'default' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` |  |
| prefix | `'bar'` | `undefined` |  |

### A Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| to | `string \| Object` | `undefined` | 如果设定了 to prop，a 会被渲染为一个 Vue Router 的 `router-link` 标签。确保你想用的不是 href 属性 |

### Ul, Ol Props

| 名称       | 类型      | 默认值  | 说明 |
| ---------- | --------- | ------- | ---- |
| align-text | `boolean` | `false` |      |

### Blockquote Props

| 名称       | 类型      | 默认值  | 说明 |
| ---------- | --------- | ------- | ---- |
| align-text | `boolean` | `false` |      |

## Slots

### 全部排版组件

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |
