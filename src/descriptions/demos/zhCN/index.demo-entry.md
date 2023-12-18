# 描述 Descriptions

<!--single-column-->

简单的列出信息。

## 演示

```demo
basic.vue
columns.vue
span.vue
placement.vue
bordered.vue
size.vue
single-line-debug.vue
```

## API

### Descriptions Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| bordered | `boolean` | `false` | 是否显示 border |  |
| column | `number` | `3` | 设置的总列数 |  |
| content-class | `string` | `undefined` | 内容的类名 | 2.36.0 |
| content-style | `Object \| string` | `undefined` | 内容的样式 |  |
| label-align | `'center' \| 'left' \| 'right'` | `'left'` | label 对齐方式 |  |
| label-placement | `'top' \| 'left'` | `'top'` | label 显示位置 |  |
| label-class | `string` | `undefined` | label 的类名 | 2.36.0 |
| label-style | `Object \| string` | `undefined` | label 的样式 |  |
| separator | `string` | `':'` | 分隔符，`label-placement` 为 `left` 并且　`bordered`　为 `false`　时生效 |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |  |
| title | `string` | `undefined` | 标题 |  |

### DescriptionItem Props

| 名称          | 类型               | 默认值      | 说明            |
| ------------- | ------------------ | ----------- | --------------- |
| content-class | `string`           | `undefined` | 内容的类名      |
| content-style | `Object \| string` | `undefined` | 内容的样式      |
| label         | `string`           | `undefined` | 显示的 label 值 |
| label-class   | `string`           | `undefined` | label 的类名    |
| label-style   | `Object \| string` | `undefined` | label 的样式    |
| span          | `number`           | `1`         | 所占的单元格数  |

### Descriptions Slots

| 名称    | 参数 | 说明        |
| ------- | ---- | ----------- |
| default | `()` | 描述的内容  |
| header  | `()` | header 内容 |

### DescriptionItem Slots

| 名称    | 参数 | 说明                |
| ------- | ---- | ------------------- |
| default | `()` | 描述项的内容        |
| label   | `()` | 描述项的 label 信息 |
