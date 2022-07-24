<!--single-column-->

# 日历 Calendar

时间过的快。

## 演示

```demo
basic.vue
```

## API

### Calendar Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| default-value | `number` | `null` | 默认被选中的日期的时间戳 |  |
| is-date-disabled | `(timestamp: number) => boolean` | `undefined` | 日期禁用的校验函数 |  |
| value | `number \| null` | `undefined` | 被选中的日期的时间戳 |  |
| on-panel-change | `(info: { year: number, month: number })` | `undefined` | 面板内容切换的回调 | 2.24.0 |
| on-update:value | `(timestamp: number, info: { year: number, month: number, date: number }) => void` | `undefined` | 选中日期的回调，`month` 从 1 开始 |  |

### Calendar Slots

| 名称 | 参数 | 说明 | 版本 |
| --- | --- | --- | --- |
| default | `(props: { year: number, month: number, date: number })` | 每个日期中渲染的内容 |  |
| header | `(props: { year: number, month: number })` | 日历的标题，`month` 从 1 开始 | 2.29.1 |
