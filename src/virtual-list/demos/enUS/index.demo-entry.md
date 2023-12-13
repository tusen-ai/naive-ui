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
| default-scroll-key | `string \| number` | `undefined` | Default scroll key. | NEXT_VERSION |
| default-scroll-index | `number` | `undefined` | Default scroll index. | NEXT_VERSION |
| ignore-item-resize | `boolean` | `false` | Ignore item resize. It can make runtime slightly faster, although it's hard to feel. | NEXT_VERSION |
| items | `Array<object>` | `[]` | Data to display. | NEXT_VERSION |
| item-resizable | `number` | `false` | Whether dynamic sizing is enabled, you don't have to care about the size of the item, it will be calculated automatically. | NEXT_VERSION |
| item-size | `number` | required | Displays the minimum height of the item in pixels to calculate scroll size and position. | NEXT_VERSION |
| items-style | `string \| CSSProperties` | `undefined` | Items container style. | NEXT_VERSION |
| key-field | `string` | `'key'` | Field name of option key. | NEXT_VERSION |
| padding-top | `string \| number` | `undefined` | Distance from the top. | NEXT_VERSION |
| padding-bottom | `string \| number` | `undefined` | Distance from the bottom. | NEXT_VERSION |
| scrollbar-props | `object` | `undefined` | Attribute reference [Scrollbar props](scrollbar#Scrollbar-Props). | NEXT_VERSION |
| visible-items-tag | `string` | `'div'` | Items container tag. | NEXT_VERSION |
| visible-items-props | `object` | `undefined` | Items container prop. | NEXT_VERSION |
| on-scroll | `(event: Event) => void` | `undefined` | Scrolling callback function. | NEXT_VERSION |
| on-wheel | `(event: WheelEvent) => void` | `undefined` | Callback function for the wheel event. | NEXT_VERSION |
| on-resize | `(event: ResizeObserverEntry) => void` | `undefined` | Element resizing callback function. | NEXT_VERSION |

### Virtual List Methods

| Name     | Type       | Description       |
| -------- | ---------- | ----------------- |
| scrollTo | `ScrollTo` | Scroll to a node. |

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
