# 间距 Space

这是个伟大的发明（不是我发明的）。

## 演示

```demo
basic.vue
vertical.vue
from-end.vue
space-between.vue
space-around.vue
center.vue
grid-debug.vue
rtl-debug.vue
```

## API

### Space Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| align | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `undefined` | 垂直排列方式 |  |
| inline | `boolean` | `false` | 是否为行内元素 |  |
| item-style | `string \| object` | `undefined` | 节点样式 |  |
| justify | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` | 水平排列方式 | `'space-evenly'` 2.28.3 |
| size | `'small' \| 'medium' \| 'large' \| number \| [number, number]` | `'medium'` | 为数字时，是水平和垂直间距；为数组时，是 [水平间距, 垂直间距] |  |
| vertical | `boolean` | `false` | 是否垂直布局 |  |
| wrap | `boolean` | `true` | 是否超出换行 |  |

### Space Slots

| 名称    | 参数 | 说明     |
| ------- | ---- | -------- |
| default | `()` | 间距内容 |
