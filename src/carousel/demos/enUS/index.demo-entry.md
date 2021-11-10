# Carousel

It's usually used to display good news.

## Demos

```demo
basic
autoplay
hover
dot-placement
show-arrow
dot-shape
```

## API

### Carousel Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| autoplay | `boolean` | `false` | Whether to scroll automatically. |
| interval | `number` | `5000` | Auto play interval (ms). |
| dot-placement | `'top' \| 'bottom' \| 'left' \| 'right' \| 'outer'` | `'bottom'` | Dot placement in the panel. |
| dot-shape | `'dot' \| 'line' \| 'slider'` | `'dot'` | Indicator shape. |
| show-arrow | `boolean` | `false` | Whether to show arrow buttons. |
| trigger | `'click' \| 'hover'` | `'click'` | The method of manual switching. |

### Carousel Slots

| Name    | Parameters | Description       |
| ------- | ---------- | ----------------- |
| default | `()`       | Carousel content. |
