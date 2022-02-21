# Scrollbar

It looks better but I'm sure it's not as reliable as native scrollbar.

## Demos

```demo
basic.vue
x.vue
```

## API

### Scrollbar Props

| Name         | Type      | Default | Description                         |
| ------------ | --------- | ------- | ----------------------------------- |
| x-scrollable | `boolean` | `false` | Whether it can scroll horizontally. |

### Scrollbar Slots

| Name    | Parameters | Description     |
| ------- | ---------- | --------------- |
| default | `()`       | Scroll content. |

### Scrollbar Methods

| Name | Type | Description |
| --- | --- | --- |
| scrollBy | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void & (x: number, y: number) => void` | Scroll content by specific distance. |
| scrollTo | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void & (x: number, y: number) => void` | Scroll content. |
