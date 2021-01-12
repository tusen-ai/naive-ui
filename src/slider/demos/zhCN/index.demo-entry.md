# 滑动选择 Slider

就我所知，这东西一般就用来控制音量。

## 演示

```demo
basic
range
mark
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| default-value | `number \| [number, number] \| null` | `null` |  |
| disabled | `boolean` | `false` |  |
| marks | `{ [markValue: number]: string }` | `undefined` |  |
| max | `number` | `100` |  |
| min | `number` | `0` |  |
| range | `boolean` | `false` |  |
| step | `number` | `1` |  |
| value | `number \| [number, number] \| null` | `undefined` |
| on-update:value | `(value: number \| [number, number]) => any` | `undefined` |  |
