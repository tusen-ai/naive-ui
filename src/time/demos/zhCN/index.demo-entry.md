# 时间 Time

Time 提供一些基本的时间格式化功能。

## 演示

```demo
basic
type
format
relative
unix
```

## Props

| 名称   | 类型                                 | 默认值       | 说明          |
| ------ | ------------------------------------ | ------------ | ------------- |
| format | `string`                             | `undefined`  | 时间格式化    |
| time   | `number \| Date`                     | `Date.now()` | 时间          |
| to     | `number \| Date`                     | `Date.now()` | 目标时间      |
| type   | `'relative' \| 'date' \| 'datetime'` | `'datetime'` | 时间类型      |
| unix   | `boolean`                            | `false`      | `unix` 时间戳 |
