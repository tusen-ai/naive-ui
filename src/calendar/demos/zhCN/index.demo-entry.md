<!--single-column-->

# 日历 Calendar

时间过的快。

## 演示

```demo
basic
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| default-value | `number` | `null` | 默认被选中的日期的时间戳 |
| is-date-disabled | `(timestamp: number) => boolean` | `undefined` | 日期禁用的回调函数设置 |
| value | `number \| null` | `undefined` | 被选中的日期的时间戳 |
| on-update:value | `(timestamp: number, { year: number, month: number, date: number }) => void` | `undefined` | 选中日期的回调 |

## Slots

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | `({ year: number, month: number, date: number })` | 每个日期中渲染的内容 |
