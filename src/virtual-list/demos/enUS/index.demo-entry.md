# Virtual List

When it comes to virtual lists, it can feel like a list is infinitely long, but in reality it is just secretly hiding the invisible elements.

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
| default-scroll-key | `string \| number` | `undefined` | Default scroll key. | 2.36.0 |
| default-scroll-index | `number` | `undefined` | Default scroll index. | 2.36.0 |
| ignore-item-resize | `boolean` | `false` | Ignore item resize. It can make runtime slightly faster, although it's hard to feel. | 2.36.0 |
| items | `Array<object>` | `[]` | Data to display. | 2.36.0 |
| item-resizable | `number` | `false` | Whether dynamic sizing is enabled, you don't have to care about the size of the item, it will be calculated automatically. | 2.36.0 |
| item-size | `number` | required | Displays the minimum height of the item in pixels to calculate scroll size and position. | 2.36.0 |
| items-style | `string \| CSSProperties` | `undefined` | Items container style. | 2.36.0 |
| key-field | `string` | `'key'` | Field name of option key. | 2.36.0 |
| padding-top | `string \| number` | `undefined` | Distance from the top. | 2.36.0 |
| padding-bottom | `string \| number` | `undefined` | Distance from the bottom. | 2.36.0 |
| scrollbar-props | `object` | `undefined` | Attribute reference [Scrollbar props](scrollbar#Scrollbar-Props). | 2.36.0 |
| visible-items-tag | `string` | `'div'` | Items container tag. | 2.36.0 |
| visible-items-props | `object` | `undefined` | Items container prop. | 2.36.0 |
| on-scroll | `(event: Event) => void` | `undefined` | Scrolling callback function. | 2.36.0 |
| on-wheel | `(event: WheelEvent) => void` | `undefined` | Callback function for the wheel event. | 2.36.0 |
| on-resize | `(event: ResizeObserverEntry) => void` | `undefined` | Element resizing callback function. | 2.36.0 |

### Virtual List Methods

| Name     | Type       | Description           | Version |
| -------- | ---------- | --------------------- | ------- |
| scrollTo | `ScrollTo` | Scroll to a position. | 2.36.0  |

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
