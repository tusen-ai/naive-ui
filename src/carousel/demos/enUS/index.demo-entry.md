# Carousel

It's usually used to display good news.

## Demos

```demo
basic
autoplay
hover
dot-placement
show-arrow
hover-show-arrow
```

## API

### Carousel Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| autoplay | `boolean` | `false` | Whether to scroll automatically. |
| interval | `number` | `5000` | Auto play interval (ms). |
| dot-placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Dot placement in the panel. |
| show-arrow | `boolean` | `false` | Whether to show arrow buttons. |
| show-arrow-mode | `'always' \| 'hover'` | `always` | Display arrow way always always display，hover mouse move into display |
| trigger | `'click' \| 'hover'` | `'click'` | The method of manual switching. |

### Carousel Slots

| Name    | Parameters | Description       |
| ------- | ---------- | ----------------- |
| default | `()`       | Carousel content. |
