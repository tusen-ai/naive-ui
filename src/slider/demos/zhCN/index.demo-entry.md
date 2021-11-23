# 滑动选择 Slider

就我所知，这东西一般就用来控制音量。

## 演示

```demo
basic
range
mark
restrict-selectable-values
disabled
disable-tooltip
format
reverse
vertical
multiple-debug
```

## API

### Slider Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| default-value | `number \| [number, number] \| null` | `null` | 默认值 |
| disabled | `boolean` | `false` | 是否禁用 |
| format-tooltip | `(value: number) => string \| number` | `undefined` | 格式化 tooltip |
| marks | `{ [markValue: number]: string }` | `undefined` | Slider 上的标记 |
| max | `number` | `100` | 最大值 |
| min | `number` | `0` | 最小值 |
| range | `boolean` | `false` | 是否选择范围值 |
| reverse | `boolean` | `false` | 是否倒转轨道 |
| step | `number \| 'mark'` | `1` | 步长 |
| tooltip | `boolean` | `true` | 是否展示 tooltip |
| vertical | `boolean` | `false` | 是否启用垂直模式 |
| value | `number \| [number, number] \| null` | `undefined` | 值 |
| on-update:value | `(value: number \| [number, number]) => void` | `undefined` | 值更新的回调 |
