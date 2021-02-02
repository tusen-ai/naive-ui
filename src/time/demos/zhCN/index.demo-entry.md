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

| 名称   | 类型                                 | 默认值       | 说明 |
| ------ | ------------------------------------ | ------------ | ---- |
| format | `string`                             | `undefined`  |      |
| time   | `number \| Date`                     | `Date.now()` |      |
| to     | `number \| Date`                     | `Date.now()` |      |
| type   | `'relative' \| 'date' \| 'datetime'` | `'datetime'` |      |
| unix   | `boolean`                            | `false`      |      |
