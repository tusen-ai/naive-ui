# Carousel

It's usually used to display good news.

## Demos

```demo
basic
arrow
dots
autoplay
vertical
space-between
slides-per-view
slides-per-view-auto
centered
effect
transition-name
hover
keyboard
mousewheel
simulate-drag
custom-arrow-and-dots
```

## API

### Carousel Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| default-index | `number` | `0` | default index. | NEXT_VERSION |
| current-index | `number` | `0` | current index. | NEXT_VERSION |
| show-arrow | `boolean` | `false` | Whether to show arrow buttons. | NEXT_VERSION |
| dot-type | `'dot' \| 'line' \| 'never'` | `'dot'` | Dot style. | NEXT_VERSION |
| dot-placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Dot placement in the panel. | NEXT_VERSION |
| slides-per-view | `'auto' \| number` | `1` | Number of carousels displayed on per view. | NEXT_VERSION |
| space-between | `number` | `0` | The spacing between the carousels. | NEXT_VERSION |
| centered-slides | `boolean` | `false` | Whether to center the current view carousel. | NEXT_VERSION |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Carousel shows the direction. |
| autoplay | `boolean` | `false` | Whether to scroll automatically. |
| interval | `number` | `5000` | Auto play interval (ms). |
| loop | `boolean` | `true` | Whether to loop. | NEXT_VERSION |
| trigger | `'click' \| 'hover'` | `'click'` | The method of manual switching. |
| effect | `'slide' \| 'fade' \| 'card'` | `'slide'` | Transition effect when switching between carousel. | NEXT_VERSION |
| transition-duration | `number` | `300` | Duration of transition effect (ms). | NEXT_VERSION |
| transition-timing-function | `string` | `undefined` | Transition timing function. | NEXT_VERSION |
| transition-name | `string` | `undefined` | Custom transition name. | NEXT_VERSION |
| draggable | `boolean` | `false` | Whether to switch the carousel by dragging the mouse. | NEXT_VERSION |
| touchable | `boolean` | `true` | Whether to switch the carousel by touch. | NEXT_VERSION |
| mousewheel | `boolean` | `false` | Whether to switch the carousel through the mouse wheel. | NEXT_VERSION |
| keyboard | `boolean` | `false` | Whether to switch the carousel by pressing the key, it only works when the focus is on Dots. | NEXT_VERSION |
| on-update:current-index | `(currentIndex: number, lastIndex: number) => void` | `undefined` | Callback function when the current index changes. | NEXT_VERSION |

### Carousel Slots

| Name | Parameters | Description | Version |
| ------- | ---- | ---------- | --- |
| default | `()` | Carousel content. |
| arrow | `({total: number, currentIndex: number, slideTo: (index: number) => void, slidePrev: () => void, slideNext: () => void})` | Arrow. | NEXT_VERSION |
| dots | `({total: number, currentIndex: number, slideTo: (index: number) => void})` | Dots. | NEXT_VERSION |

### Carousel Methods

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| slideTo | `(index: number) => void` | Slide to index. | NEXT_VERSION |
| slidePrev | `() => void` | Slide to previous page. | NEXT_VERSION |
| slideNext | `() => void` | Slide to next page. | NEXT_VERSION |
| getCurrentIndex | `() => number` | Get current index. | NEXT_VERSION |