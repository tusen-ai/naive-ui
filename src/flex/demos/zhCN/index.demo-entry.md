# 弹性布局 Flex

自 `2.37.0` 提供该组件。

实话讲用起来和 `n-space` 差不多，但是能用 `n-flex` 就不要用 `n-space`。

`n-flex` 使用 `flex` 布局，其中 `gap` 属性可能对某些老浏览器兼容性不好。

`n-space` 会进行 `VNode` 级别的操作，可能在某些特殊用例下出现一些渲染问题。

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

### Flex Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| align | `string` | `undefined` | 垂直排列方式，参考 [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) | 2.37.0 |
| inline | `boolean` | `false` | 是否为行内元素 | 2.37.0 |
| justify | `string` | `'start'` | 水平排列方式，参考 [justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) | 2.37.0 |
| size | `'small' \| 'medium' \| 'large' \| number \| [number, number]` | `'medium'` | 为数字时，是水平和垂直间距；为数组时，是 [水平间距, 垂直间距] | 2.37.0 |
| vertical | `boolean` | `false` | 是否垂直布局 | 2.37.0 |
| wrap | `boolean` | `true` | 是否超出换行 | 2.37.0 |

### Flex Slots

| 名称    | 参数 | 说明 | 版本   |
| ------- | ---- | ---- | ------ |
| default | `()` | 内容 | 2.37.0 |
