# Virtual List

When it comes to virtual lists, it can feel like a list is infinitely long, but in reality it is just secretly hiding the invisible elements

It's like a lazy programmer holding up a blank note and saying, "You can't see me, and I can't load myself!"

## Demos

```demo
basic.vue
dynamic-size.vue
scroll.vue
keep-alive.vue
```

## API

### Virtual List Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| default-scroll-key | `String \| Number` | `undefined` | Default scroll Key. |  |
| default-scroll-index | `Number` | `undefined` | Default scroll Index. |  |
| ignore-item-resize | `Boolean` | `undefined` | Ignore. |  |
| items | `Array<object>` | `[]` | Data to display. |  |
| item-resizable | `Number` | `undefined` | Whether dynamic sizing is enabled, you don't have to care about the size of the item, it will be calculated automatically. |  |
| item-size | `Number` | `undefined` | Displays the minimum height of the item in pixels to calculate scroll size and position. |  |
| items-style | `String \| CSSProperties` | `undefined` | Items container style. |  |
| key-field | `String` | `key` | Field name of option key. |  |
| padding-top | `String \| Nunmber` | `undefined` | Distance from the top. |  |
| padding-bottom | `String \| Nunmber` | `undefined` | Distance from the bottom. |  |
| scrollbar-props | `Object` | `undefined` | Attribute reference [Scrollbar props](scrollbar#Scrollbar-Props). |  |
| visible-tems-tag | `String` | `div` | Items container tag. |  |
| visible-tems-props | `Object` | `undefined` | Items container prop. |  |
| on-scroll | `(event: Event) => void` | `undefined` | Scrolling callback function. |  |
| on-wheel | `(event: WheelEvent) => void` | `undefined` | Callback function for the wheel event. |  |
| on-resize | `(event: ResizeObserverEntry) => void` | `undefined` | Element resizing callback function. |  |

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

| 名称     | 参数       | 说明              |
| -------- | ---------- | ----------------- |
| scrollTo | `ScrollTo` | Scroll to a node. |
