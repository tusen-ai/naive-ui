<!--single-column-->

# 页头 PageHeader

我感觉你很可能用不上这个组件，因为根据你拿到的设计稿很可能是重写一个简单。

## 演示

```demo
basic
```

## Props

| 名称     | 类型         | 默认值      | 说明 |
| -------- | ------------ | ----------- | ---- |
| extra    | `string`     | `undefined` |      |
| subtitle | `string`     | `undefined` |      |
| title    | `string`     | `undefined` |      |
| on-back  | `() => void` | `undefined` |      |

## Slots

| 名称     | 参数 | 说明 |
| -------- | ---- | ---- |
| avatar   | `()` |      |
| header   | `()` |      |
| default  | `()` |      |
| extra    | `()` |      |
| footer   | `()` |      |
| subtitle | `()` |      |
| title    | `()` |      |
