# 无限滚动 Infinite Scroll

滚雪球，滚啊滚，内容越来越多，停不下来。

`2.38.2` 版本开始提供该组件。

## 演示

```demo
basic.vue
reverse.vue
chat.vue
```

## API

### Infinite Scroll Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| distance | `number` | `0` | 触发加载的距离阈值 | 2.38.2 |
| reverse | `boolean` | `false` | 是否从顶部触发加载。默认从底部触发加载 | NEXT_VERSION |
| scrollbar-props | `Object` | `undefined` | 属性参考 [Scrollbar props](scrollbar#Scrollbar-Props) | 2.38.2 |
| on-load | `() => Promise<void> \| void` | `undefined` | 滚动到底部时的回调函数 | 2.38.2 |

### Infinite Slots

| 名称    | 参数 | 说明            |
| ------- | ---- | --------------- |
| default | `()` | Infinite 的内容 |
