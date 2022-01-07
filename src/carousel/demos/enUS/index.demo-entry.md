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

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-index | `number` | `0` | default index. |
| active-index | `number` | `0` | current index. |
| show-arrow | `boolean` | `false` | Whether to show arrow buttons. |
| dot-style | `'dot' \| 'line' \| 'never'` | `'dot'` | Dot style. |
| dot-placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Dot placement in the panel. |
| slides-per-view | `'auto' \| number` | `1` | Number of carousels displayed on per view. |
| space-between | `number` | `0` | The spacing between the carousels. |
| centered-slides | `boolean` | `false` | Whether to center the current view carousel. |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Carousel shows the direction. |
| autoplay | `boolean` | `false` | Whether to scroll automatically. |
| interval | `number` | `5000` | Auto play interval (ms). |
| loop | `boolean` | `true` | Whether to loop. |
| trigger | `'click' \| 'hover'` | `'click'` | The method of manual switching. |
| effect | `'slide' \| 'fade' \| 'card'` | `'slide'` | Transition effect when switching between carousel. |
| speed | `number` | `300` | Duration of transition effect (ms). |
| transition-timing-function | `string` | `undefined` | Transition timing function. |
| transition-name | `string` | `undefined` | Custom transition name. |
| draggable | `boolean` | `false` | Whether to switch the carousel by dragging the mouse. |
| touchable | `boolean` | `true` | Whether to switch the carousel by touch. |
| mousewheel | `boolean` | `false` | Whether to switch the carousel through the mouse wheel. |
| keyboard | `boolean` | `false` | Whether to switch the carousel by pressing the key, it only works when the focus is on Dots. |
| onChange | `(current: number, from: number) => void` | `undefined` | Callback function when the current index changes. |

### Carousel Slots

| Name    | Parameters | Description       |
| ------- | ---- | ---------- |
| default | `()` | Carousel content. |
| arrow | `({total: number, current: number, slideTo: (index: number) => void, slidePrev: () => void, slideNext: (index) => void, isPrevDisabled: () => boolean, isNextDisabled: () => boolean})` | Arrow. |
| dots | `({total: number, current: number, slideTo: (index: number) => void})` | Dots. |

### Carousel Methods

| Name | Type | Description |
| --- | --- | --- |
| slideTo | `(index: number) => void` | Slide to index. |
| slidePrev | `() => void` | Slide to previous page. |
| slideNext | `() => void` | Slide to next page. |
| isActive | `(index: number) => boolean` | Whether it is the current page. |
| isPrev | `(index: number) => boolean` | Whether it is the previous page. |
| isNext | `(index: number) => boolean` | Whether it is the next page. |
| isPrevDisabled | `(index: number) => boolean` | Whether you can slide to the previous page. |
| isNextDisabled | `(index: number) => boolean` | Whether you can slide to the next page. |
| getPrevIndex | `(index?: number) => number \| null` | Get previous page index. |
| getNextIndex | `(index?: number) => number \| null` | Get next page index. |