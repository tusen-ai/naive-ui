# 评分 Rate

没有把握的话不要给星星换颜色，那会是个灾难。

## 演示

```demo
basic.vue
size.vue
color.vue
icon.vue
allow-half.vue
readonly.vue
clearable.vue
```

## API

### Rate Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| allow-half | `boolean` | `false` | 允许只激活一半图标 |  |
| clearable | `boolean` | `false` | 是否可清空，在点击当前值对应的图标后值会被设为 `null` | 2.33.0 |
| color | `string` | `undefined` | 已激活图标颜色（支持形如 `#FFF`， `#FFFFFF`， `yellow`，`rgb(0, 0, 0)` 的颜色） |  |
| count | `number` | `5` | 图标个数 |  |
| default-value | `number \| null` | `null` | 默认已激活图标个数，2.33.0 前默认值为 `0` | 2.33.0 开始支持 `null` |
| readonly | `boolean` | `false` | 只读，交互失效 |  |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | 图标尺寸 |  |
| value | `number \| null` | `undefined` | 已激活图标个数 |  |
| on-clear | `() => void` | `undefined` | 清除当前值的回调 | 2.33.0 |
| on-update:value | `(value: number) => void` | `undefined` | 激活图标个数改变时触发 |  |

### Rate Slots

| 名称    | 参数                        | 说明       |
| ------- | --------------------------- | ---------- |
| default | `(info: { index: number })` | 评分的图标 |
