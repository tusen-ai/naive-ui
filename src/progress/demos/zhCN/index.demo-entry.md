# 进度 Progress

不知道说点啥，但是还是得写点东西，让这个页面看起来舒展一点。

## 演示

```demo
circle.vue
line.vue
circle-offset.vue
multiple-circle.vue
dashboard.vue
custom-indicator.vue
color.vue
no-indicator.vue
height.vue
processing.vue
```

## API

### Progress Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| border-radius | `number \| string` | `undefined` | `'line'` 类型进度条的圆角半径，不填写则维持高度的一半 |  |
| circle-gap | `number` | `1` | 当类型是 `'multiple-circle'` 的时候圈之间的距离，假设 `viewbox` 的尺寸是 `100` |  |
| color | `string \| string[]` | `undefined` | 进度条颜色 |  |
| fill-border-radius | `number \| string` | `undefined` | `'line'` 类型进度条填充的圆角半径，不填写则维持 `border-radius` |  |
| gap-degree | `number` | `75` | 仪表盘进度条缺口角度，取值范围 0 ~ 360 | 2.25.2 |
| gap-offset-degree | `number` | `0` | 仪表盘进度条缺口位置 | 2.25.2 |
| height | `number` | `undefined` | `'line'` 类型进度条的高度，不填写则维持默认高度 |  |
| indicator-placement | `'inside' \| 'outside'` | `'outside'` | `'line'` 类型设置指示标位置 |  |
| indicator-text-color | `string` | `undefined` | 指示标文本颜色 |  |
| offset-degree | `number` | `0` | 进度的偏移角度，只对 `'circle'` 类型生效 | 2.24.0 |
| percentage | `number \| number[]` | `0` | 百分比的值 |  |
| processing | `boolean` | `false` | 处理中状态 |  |
| rail-color | `string \| string[]` | `undefined` | 轨道的颜色 |  |
| rail-style | `string \| CSS \| Array<string \| CSS>` | `undefined` | 轨道的对象 |  |
| show-indicator | `boolean` | `true` | 是否显示指示标 |  |
| status | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | 进度条状态 |  |
| stroke-width | `number` | `7` | 进度条宽度 |  |
| type | `'line' \| 'circle' \| 'multiple-circle' \| 'dashboard'` | `'line'` | 进度条类型 | `'dashboard'` 2.25.2 |
| unit | `string` | `%` | 进度条单位 |  |

### Progress Slots

| 名称    | 参数 | 说明           |
| ------- | ---- | -------------- |
| default | `()` | 指示标里的内容 |
