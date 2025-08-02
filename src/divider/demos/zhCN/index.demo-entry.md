# 分割线 Divider

分割一些内容。

## 演示

```demo
basic.vue
content.vue
vertical.vue
content.offset.vue
vertical.content.vue
```

## API

### Divider Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| type | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | 分割线的类型 | NEXT_VERSION |
| title-placement | `'before' \| 'center' \| 'after'` | `'center'` | 标题的位置 | NEXT_VERSION |
| offset | `number` | `28` | 分割线与标题的偏移量，只在 `title-placement` 为 `before` 或 `after` 时生效 | NEXT_VERSION |
| vertical | `boolean` | `false` | 是否垂直分隔 |  |
| title-class | `string` | `undefined` | 标题 div 的类名 | NEXT_VERSION |
| title-style | `string \| object` | `undefined` | 标题 div 的 style | NEXT_VERSION |

### Divider Slots

| 名称    | 参数 | 说明         |
| ------- | ---- | ------------ |
| default | `()` | 分割线的标题 |
