# 虚拟列表

当谈到虚拟列表时，能让你感觉列表像是无限长的，但实际上它只是在偷偷隐藏那些不可见的元素

就像是个懒惰的程序员拿着一个空白纸条说：“你看不见我，我也不会加载自己！”

## 演示

```demo
basic.vue
dynamic-size.vue
scroll.vue
keep-alive.vue
```

## API

### Virtual List Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| items | `Array<object>` | `[]` | 需要展示的数据 |  |
| item-resizable | `Number` | `undefined` | 是否启用动态尺寸，你不必关心项目大小，它会自动计算 |  |
| item-size | `Number` | `undefined` | 以像素为单位显示项目的最小高度，用于计算滚动大小和位置 |  |
| items-style | `String \| CSSProperties` | `undefined` | Items 容器样式 |  |
| scrollbar-props | `Object` | `undefined` | 属性参考 [Scrollbar props](scrollbar#Scrollbar-Props) |  |
| visible-tems-tag | `String` | `div` | Items 容器标签 |  |
| visible-tems-props | `Object` | `undefined` | Items 容器属性 |  |
| ignore-item-resize | `Boolean` | `undefined` | 忽略 |  |
| on-scroll | `(event: Event) => void` | `undefined` | 滚动的回调函数 |  |
| on-wheel | `(event: WheelEvent) => void` | `undefined` | 滚轮事件的回调函数 |  |
| on-resize | `(event: ResizeObserverEntry) => void` | `undefined` | 元素大小调整的回调函数 |  |
| default-scroll-key | `String \| Number` | `undefined` | 默认滚动的 Key |  |
| default-scroll-index | `Number` | `undefined` | 默认滚动的 Index |  |
| key-field | `String` | `key` | 选项 key 的字段名 |  |
| padding-top | `String \| Nunmber` | `undefined` | 距离上部的距离 |  |
| padding-bottom | `String \| Nunmber` | `undefined` | 距离底部的距离 |  |

#### ScrollTo Type

```ts
interface ScrollTo {
  (x: number, y: number): void
  (
    options: {
      left?: number
      top?: number
    } & CommonScrollToOptions
  ): void
  (
    options: {
      index: number
    } & CommonScrollToOptions
  ): void
  (
    options: {
      key: string | number
    } & CommonScrollToOptions
  ): void
  (
    options: {
      position: 'top' | 'bottom'
    } & CommonScrollToOptions
  ): void
}
```

### Virtual List Methods

| 名称     | 参数       | 说明           |
| -------- | ---------- | -------------- |
| scrollTo | `ScrollTo` | 滚动到某个节点 |
