# Scrollbar

It looks better but I'm sure it's not as reliable as native scrollbar.

## Demos

```demo
basic.vue
x.vue
trigger.vue
no-sync.vue
custom.vue
placement.vue
```

## API

### Scrollbar Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| content-class | `string` | `undefined` | Class name of content div. | 2.38.2 |
| content-style | `string \| object` | `undefined` | Style of content div. | 2.38.2 |
| size | `number` | `undefined` | Size of scrollbar. | 2.34.4 |
| trigger | `'hover' \| 'none'` | `'hover'` | Trigger of show scrollbar. `'none'` means always show it. | 2.29.1 |
| x-scrollable | `boolean` | `false` | Whether it can scroll horizontally. |  |
| x-placement | `'top' \| 'bottom'` | `bottom` | Scrollbar placement when scrolling horizontally. | 2.40.0 |
| y-placement | `'left' \| 'right'` | `right` | Scrollbar placement when scrolling vertically. | 2.40.0 |
| on-scroll | `(e: Event) => void` | `undefined` | Callback on scroll. |  |

### Scrollbar Slots

| Name    | Parameters | Description     |
| ------- | ---------- | --------------- |
| default | `()`       | Scroll content. |

### Scrollbar Methods

| Name | Type | Description |
| --- | --- | --- |
| scrollBy | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void & (x: number, y: number) => void` | Scroll content by specific distance. |
| scrollTo | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void & (x: number, y: number) => void` | Scroll content. |
