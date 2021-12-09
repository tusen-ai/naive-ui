# 统计数据 Statistic

和它看起来一样简单。

## 演示

```demo
basic
animation
countdown
```

## API

### Statistic Props

| 名称               | 类型      | 默认值      | 说明                   |
| ------------------ | --------- | ----------- | ---------------------- |
| label              | `string`  | `undefined` | 展示的 `label` 信息    |
| value              | `string`  | `undefined` | 统计数据的值           |
| precision          | `number`  | `undefined` | 精度，保留小数点后几位 |
| format             | `string`  | `HH:mm:ss`  | 格式化值的方式         |
| show-separator     | `boolean` | `false`     | 是否显示分隔符         |
| value-from         | `number`  | `0`         | 数值动画起始值         |
| start              | `boolean` | `false`     | 是否开始动画           |
| animation          | `boolean` | `false`     | 是否开启动画           |
| animation-duration | `number`  | `3000`      | 动画持续时间           |

### Statistic Slots

| 名称    | 参数 | 说明     |
| ------- | ---- | -------- |
| default | `()` | 值       |
| label   | `()` | 标签     |
| prefix  | `()` | 值的前缀 |
| suffix  | `()` | 值的后缀 |

### CountDown Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| label | `string` | `undefined` | 展示的 `label` 信息 |
| value | `number` | `() => Date.now() + 300000` | 倒计时的值 |
| start | `boolean` | `true` | 是否开始倒计时 |
| now | `number` | `() => Date.now()` | 当前时间戳 |
| format | `string` | `'HH:mm:ss'` | 时间格式 |
| on-finish | `(value: number) => void` | `undefined` | 时间到了的回调 |
| on-start | `() => void` | `undefined` | 开始倒计时的回调 |

### CountDown Slots

| 名称  | 参数 | 说明 |
| ----- | ---- | ---- |
| label | `()` | 标签 |
