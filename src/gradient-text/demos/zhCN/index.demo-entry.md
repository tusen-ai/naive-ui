# 渐变文字 Gradient Text

这个东西看起来没啥用，实际上确实没啥用。

## 演示

```demo
basic.vue
size.vue
custom.vue
```

## API

### GradientText Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| gradient | `string \| { from: string, to: string, deg: number \| string }` | `undefined` | 文字渐变色参数 |
| size | `number \| string` | `undefined` | 文字大小（当不指定单位时，默认单位: `px`） |
| type | `'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'primary'` | 渐变文字的类型 |

### GradientText Slots

| 名称    | 参数 | 说明           |
| ------- | ---- | -------------- |
| default | `()` | 渐变文字的内容 |
