# Carousel

It's usually used to display good news.

## Demos

```demo
basic
autoplay
hover
dot-placement
show-arrow
```

## API

### Carousel Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| show-arrow | `boolean` | `false` | Whether to show arrow button. |
| autoplay | `boolean` | `false` | Whether to scroll automatically. |
| interval | `number` | `5000` | Auto play interval. |
| dot-placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Dot placement in the panel. |
| trigger | `'click' \| 'hover'` | `'click'` | The way to trigger the switch. |

### Carousel Slots

| Name    | Parameters | Description       |
| ------- | ---------- | ----------------- |
| default | `()`       | Carousel content. |
