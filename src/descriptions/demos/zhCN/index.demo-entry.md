# 描述 Descriptions

<!--single-column-->

简单的列出信息。

## 演示

```demo
basic
columns
span
placement
bordered
size
```

## Props

### Descriptions Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | 是否显示 border |
| column | `number` | `3` | 设置的总列数 |
| content-style | `Object \| string` | `undefined` | 内容的样式 |
| label-align | `'center' \| 'left' \| 'right'` | `'left'` | label 对齐方式 |
| label-placement | `'top' \| 'left'` | `'top'` | label 显示位置 |
| label-style | `Object \| string` | `undefined` | label的样式 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| title | `string` | `undefined` | 标题 |

### Description Item Props

| 名称  | 类型     | 默认值      | 说明            |
| ----- | -------- | ----------- | --------------- |
| content-style | `Object \| string` | `undefined` | 内容的样式 |
| label | `string` | `undefined` | 显示的 label 值 |
| label-style | `Object \| string` | `undefined` | label的样式 |
| span  | `number` | `1`         | 所占的单元格数  |

## Slots

### Descriptions Slots

| 名称    | 参数 | 说明        |
| ------- | ---- | ----------- |
| default | `()` | 描述的内容  |
| header  | `()` | header 内容 |

### Description Item Slots

| 名称    | 参数 | 说明                |
| ------- | ---- | ------------------- |
| default | `()` | 描述项的内容        |
| label   | `()` | 描述项的 label 信息 |
