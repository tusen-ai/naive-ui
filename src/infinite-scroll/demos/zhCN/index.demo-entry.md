# 无限滚动

滚雪球，滚啊滚，内容越来越多，停不下来

`NEXT_VERSION` 版本开始提供该组件。

## 演示

```demo
basic.vue
delay.vue
chat.vue
```

## API

### Infinite Scroll Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| delay | `Number` | `undefined` | 延迟显示，单位为毫秒 | NEXT_VERSION |
| distance | `Number` | `0` | 触发加载的距离阈值 | NEXT_VERSION |
| on-load | `() => Promise<void>` | `undefined` | 滚动到底部时的回调函数 | NEXT_VERSION |
| scrollbar-props | `Object` | `undefined` | 属性参考 [Scrollbar props](scrollbar#Scrollbar-Props) | NEXT_VERSION |
