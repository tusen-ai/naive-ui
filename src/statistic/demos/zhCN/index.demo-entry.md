# 统计数据 Statistic

和它看起来一样简单。

## 演示

```demo
basic.vue
rtl-debug.vue
```

## API

### Statistic Props

| 名称         | 类型      | 默认值      | 说明                | 版本   |
| ------------ | --------- | ----------- | ------------------- | ------ |
| label        | `string`  | `undefined` | 展示的 `label` 信息 |        |
| tabular-nums | `boolean` | `false`     | 是否让数字等宽      | 2.23.2 |
| value        | `string`  | `undefined` | 统计数据的值        |        |

### Statistic Slots

| 名称    | 参数 | 说明     |
| ------- | ---- | -------- |
| default | `()` | 值       |
| label   | `()` | 标签     |
| prefix  | `()` | 值的前缀 |
| suffix  | `()` | 值的后缀 |
