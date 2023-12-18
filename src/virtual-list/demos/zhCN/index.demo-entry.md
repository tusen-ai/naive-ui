# 虚拟列表

当谈到虚拟列表时，能让你感觉列表像是无限长的，但实际上它只是在偷偷隐藏那些不可见的元素。

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
| default-scroll-key | `string \| number` | `undefined` | 默认滚动的 Key | 2.36.0 |
| default-scroll-index | `number` | `undefined` | 默认滚动的 Index | 2.36.0 |
| ignore-item-resize | `boolean` | `false` | 忽略内容尺寸变化，可以让运行快一些（尽管应该很难感受到） | 2.36.0 |
| items | `Array<object>` | `[]` | 需要展示的数据 | 2.36.0 |
| item-resizable | `number` | `false` | 是否启用动态尺寸，你不必关心项目大小，它会自动计算 | 2.36.0 |
| item-size | `number` | required | 以像素为单位显示项目的最小高度，用于计算滚动大小和位置 | 2.36.0 |
| items-style | `string \| CSSProperties` | `undefined` | 全部内容的容器样式 | 2.36.0 |
| key-field | `string` | `'key'` | 选项 key 的字段名 | 2.36.0 |
| padding-top | `string \| number` | `undefined` | 距离上部的距离 | 2.36.0 |
| padding-bottom | `string \| number` | `undefined` | 距离底部的距离 | 2.36.0 |
| scrollbar-props | `ScrollbarProps` | `undefined` | 属性参考 [Scrollbar props](scrollbar#Scrollbar-Props) | 2.36.0 |
| visible-items-tag | `string` | `'div'` | 全部内容的容器标签 | 2.36.0 |
| visible-items-props | `object` | `undefined` | 全部内容的容器属性 | 2.36.0 |
| on-scroll | `(event: Event) => void` | `undefined` | 滚动的回调函数 | 2.36.0 |
| on-wheel | `(event: WheelEvent) => void` | `undefined` | 滚轮事件的回调函数 | 2.36.0 |
| on-resize | `(event: ResizeObserverEntry) => void` | `undefined` | 元素大小调整的回调函数 | 2.36.0 |

### Virtual List Methods

| 名称     | 参数       | 说明           | 版本   |
| -------- | ---------- | -------------- | ------ |
| scrollTo | `ScrollTo` | 滚动到某个位置 | 2.36.0 |

#### ScrollTo Type

```ts
interface ScrollTo {
  (x: number, y: number): void
  (options: {
    left?: number
    top?: number
    behavior?: ScrollBehavior
    debounce?: boolean
  }): void
  (options: {
    index: number
    behavior?: ScrollBehavior
    debounce?: boolean
  }): void
  (options: {
    key: string | number
    behavior?: ScrollBehavior
    debounce?: boolean
  }): void
  (options: {
    position: 'top' | 'bottom'
    behavior?: ScrollBehavior
    debounce?: boolean
  }): void
}
```
