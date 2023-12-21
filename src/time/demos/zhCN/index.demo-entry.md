# 时间 Time

Time 提供一些基本的时间格式化功能。

## 演示

```demo
basic.vue
type.vue
format.vue
relative.vue
unix.vue
timezone.vue
timezone-debug.vue
```

## API

### Time Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| format | `string` | `undefined` | 时间格式化字符串，详情见 [format](https://date-fns.org/v2.23.0/docs/format) |  |
| time | `number \| Date` | `Date.now()` | 时间 |  |
| time-zone | `string` | `undefined` | 格式化值时使用的时区，遵循 [iana time zones](https://www.iana.org/time-zones) 格式。你可以使用 `Intl.supportedValuesOf('timeZone')` 来查看支持的时区 | 2.30.0 |
| to | `number \| Date` | `Date.now()` | 目标时间 |  |
| type | `'relative' \| 'date' \| 'datetime'` | `'datetime'` | 时间类型 |  |
| unix | `boolean` | `false` | `unix` 时间戳 |  |
