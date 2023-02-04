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
| trigger | `'hover' \| 'none'` | `'hover'` | Trigger of show scrollbar. `'none'` means always show it. | 2.29.1 |
| x-scrollable | `boolean` | `false` | Whether it can scroll horizontally. |  |
| on-scroll | `(e: Event) => void` | `undefined` | Callback on scroll |  |
| size | `number` | `undefined` | Size of scrollbar. | NEXT_VERSION |

### Scrollbar Slots

| Name    | Parameters | Description     |
| ------- | ---------- | --------------- |
| default | `()`       | Scroll content. |

### Scrollbar Methods

| Name | Type | Description |
| --- | --- | --- |
| scrollBy | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void & (x: number, y: number) => void` | Scroll content by specific distance. |
| scrollTo | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void & (x: number, y: number) => void` | Scroll content. |
