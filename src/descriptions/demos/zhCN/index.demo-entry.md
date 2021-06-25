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
| bordered | `boolean` | `false` | Descriptions 是否显示 border |
| column | `number` | `3` | Descriptions 设置的总列数 |
| label-align | `'center' \| 'left' \| 'right'` | `'left'` | Descriptions 的 label 的对齐方式 |
| label-placement | `'top' \| 'left'` | `'top'` | Descriptions 的 label 的位置 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Descriptions 的尺寸 |
| title | `string` | `undefined` | Descriptions 的标题 |

### Description Item Props

| 名称  | 类型     | 默认值      | 说明                             |
| ----- | -------- | ----------- | -------------------------------- |
| label | `string` | `undefined` | Descriptions item 显示的 label   |
| span  | `number` | `1`         | Descriptions item 所占的单元格数 |

## Slots

### Descriptions Slots

| 名称    | 参数 | 说明                              |
| ------- | ---- | --------------------------------- |
| default | `()` | Descriptions 的内容               |
| header  | `()` | Descriptions 的 header 部分的内容 |

### Description Item Slots

| 名称    | 参数 | 说明                            |
| ------- | ---- | ------------------------------- |
| default | `()` | Descriptions item 的内容        |
| label   | `()` | Descriptions item 的 label 内容 |
