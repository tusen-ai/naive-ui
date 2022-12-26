# Scrollbar

It looks better but I'm sure it's not as reliable as native scrollbar.

## Demos

```demo
basic.vue
x.vue
trigger.vue
```

## API

### Scrollbar Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| size | `Number` | `5` | Scroll bar size. |   |
| duration | `Number` | `0` | Scroll bars hide animation time. |   |
| container-class | `string` | `undefined` | Container class of the Scroll bar. |   |
| container-style | `Object` | `undefined` | Container style of the Scroll bar. |   |
| content-class | `string` | `undefined` | Content class of the Scroll bar. |   |
| content-style | `Object` | `undefined` | Content style of the Scroll bar. |   |
| horizontal-rail-style | `Object` | `undefined` | Horizontal scrolling track style. |   |
| vertical-rail-style | `Object` | `undefined` | Vertical scrolling track style. |   |
| trigger | `'hover' \| 'none'` | `'hover'` | Trigger of show scrollbar. `'none'` means always show it. | 2.29.1 |
| x-scrollable | `boolean` | `false` | Whether it can scroll horizontally. |  |
| on-scroll | `(e: Event) => void` | `undefined` | Callback on scroll |  |

### Scrollbar Slots

| Name    | Parameters | Description     |
| ------- | ---------- | --------------- |
| default | `()`       | Scroll content. |

### Scrollbar Methods

| Name | Type | Description |
| --- | --- | --- |
| scrollBy | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void & (x: number, y: number) => void` | Scroll content by specific distance. |
| scrollTo | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void & (x: number, y: number) => void` | Scroll content. |
