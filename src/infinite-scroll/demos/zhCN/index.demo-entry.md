# 无限滚动

滚雪球，滚啊滚，内容越来越多，停不下来。

`2.38.2` 版本开始提供该组件。

## 演示

```demo
basic.vue
chat.vue
```

## API

### Infinite Scroll Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| distance | `number` | `0` | 触发加载的距离阈值 | 2.38.2 |
| scrollbar-props | `Object` | `undefined` | 属性参考 [Scrollbar props](scrollbar#Scrollbar-Props) | 2.38.2 |
| on-load | `() => Promise<void> \| void` | `undefined` | 滚动到底部时的回调函数 | 2.38.2 |
