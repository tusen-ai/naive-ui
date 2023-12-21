# 滑动选择 Slider

就我所知，这东西一般就用来控制音量。

## 演示

```demo
basic.vue
range.vue
mark.vue
restrict-selectable-values.vue
disabled.vue
disable-tooltip.vue
format.vue
reverse.vue
vertical.vue
show-tooltip.vue
multiple-debug.vue
custom-thumb.vue
keyboard-debug.vue
```

## API

### Slider Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| default-value | `number \| [number, number] \| null` | `null` | 默认值 |  |
| disabled | `boolean` | `false` | 是否禁用 |  |
| format-tooltip | `(value: number) => string \| number` | `undefined` | 格式化 tooltip |  |
| keyboard | `boolean` | `true` | 是否可键盘控制 | 2.33.0 |
| marks | `{ [markValue: number]: string }` | `undefined` | Slider 上的标记 |  |
| max | `number` | `100` | 最大值 |  |
| min | `number` | `0` | 最小值 |  |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `undefined` | Tooltip 的弹出位置 | 2.25.0 |
| range | `boolean` | `false` | 是否选择范围值 |  |
| reverse | `boolean` | `false` | 是否倒转轨道 |  |
| show-tooltip | `boolean` | `false` | 是否一直显示 tooltip，仅对非 range 生效 | 2.24.2 |
| step | `number \| 'mark'` | `1` | 步长 |  |
| tooltip | `boolean` | `true` | 是否展示 tooltip |  |
| vertical | `boolean` | `false` | 是否启用垂直模式 |  |
| value | `number \| [number, number] \| null` | `undefined` | 值 |  |
| on-update:value | `(value: number \| [number, number]) => void` | `undefined` | 值更新的回调 |  |
| on-dragstart | `() => void` | `undefined` | 开始拖拽的回调函数 | 2.36.0 |
| on-dragend | `() => void` | `undefined` | 拖拽结束的回调函数 | 2.36.0 |

### Slider Slots

| 名称  | 参数 | 说明     | 版本   |
| ----- | ---- | -------- | ------ |
| thumb | `()` | 滑块按钮 | 2.30.4 |
