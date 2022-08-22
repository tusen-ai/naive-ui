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

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| allow-half | `boolean` | `false` | 允许只激活一半图标 |
| color | `string` | `undefined` | 已激活图标颜色（支持形如 `#FFF`， `#FFFFFF`， `yellow`，`rgb(0, 0, 0)` 的颜色） |
| count | `number` | `5` | 图标个数 |
| default-value | `number` | `0` | 默认已激活图标个数 |
| readonly | `boolean` | `false` | 只读，交互失效 |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | 图标尺寸 |
| value | `number` | `undefined` | 绑定已激活图标个数 |
| on-update:value | `(value: number) => void` | `undefined` | 激活图标个数改变时触发 |

### Rate Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | `()` | 评分的图标 |
