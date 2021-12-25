# 倒计时 Countdown

和它看起来一样简单。

## 演示

```demo
basic
```

## API

### CountDown Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| label | `string` | `undefined` | 展示的 `label` 信息 |
| value | `number` | `() => Date.now() + 300000` | 倒计时的值 |
| start | `boolean` | `true` | 是否开始倒计时 |
| now | `number` | `() => Date.now()` | 当前时间戳 |
| format | `string` | `'HH:mm:ss'` | 时间格式 |
| on-finish | `(value: number) => void` | `undefined` | 时间到了的回调 |

### CountDown Slots

| 名称   | 参数 | 说明 |
| ------ | ---- | ---- |
| label  | `()` | 标签 |
| prefix | `()` | 前缀 |
