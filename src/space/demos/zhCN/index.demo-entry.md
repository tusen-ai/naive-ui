# 间距 Space

这是个伟大的发明（不是我发明的）。

## 演示

```demo
basic
vertical
from-end
space-between
space-around
center
grid-debug
```

## API

### Space Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| align | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `undefined` | 垂直排列方式 |
| inline | `boolean` | `false` | 是否为行内元素 |
| item-style | `string \| object` | `undefined` | 节点样式 |
| justify | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between'` | `'start'` | 水平排列方式 |
| size | `'small' \| 'medium' \| 'large' \| number \| [number, number]` | `'medium'` | 为数字时，是垂直和水平间距；为数组时，是 [垂直间距, 水平间距] |
| vertical | `boolean` | `false` | 是否垂直布局 |
| wrap | `boolean` | `true` | 是否超出换行 |

### Space Slots

| 名称    | 参数 | 说明     |
| ------- | ---- | -------- |
| default | `()` | 间距内容 |
