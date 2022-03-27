# Carousel

It's usually used to display good news.

## Demos

```demo
basic.vue
arrow.vue
autoplay.vue
dots.vue
vertical.vue
space-between.vue
slides-per-view.vue
slides-per-view-auto.vue
centered.vue
effect.vue
transition-name.vue
hover.vue
keyboard.vue
mousewheel.vue
simulate-drag.vue
custom-arrow-and-dots.vue
custom-card.vue
```

## API

### Carousel Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| autoplay | `boolean` | `false` | Whether to scroll automatically. |  |
| centered-slides | `boolean` | `false` | Whether to center the current view carousel. | 2.24.0 |
| current-index | `number` | `undefined` | current index. | 2.24.0 |
| default-index | `number` | `0` | default index. | 2.24.0 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Carousel shows the direction. |  |
| dot-placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Dot placement in the panel. | 2.24.0 |
| dot-type | `'dot' \| 'line'` | `'dot'` | Dot style. | 2.24.0 |
| draggable | `boolean` | `false` | Whether to switch the carousel by dragging the mouse. | 2.24.0 |
| effect | `'slide' \| 'fade' \| 'card' \| 'custom'` | `'slide'` | Transition effect when switching between carousel. | 2.24.0, `'card'` 2.24.2 |
| interval | `number` | `5000` | Auto play interval (ms). |  |
| keyboard | `boolean` | `false` | Whether to switch the carousel by pressing the key, it only works when the focus is on Dots. | 2.24.0 |
| loop | `boolean` | `true` | Whether to loop. | 2.24.0 |
| mousewheel | `boolean` | `false` | Whether to switch the carousel through the mouse wheel. | 2.24.0 |
| next-slide-style | `object \| string` | `undefined` | Next slide's style. | 2.27.0 |
| prev-slide-style | `object \| string` | `undefined` | Previous slide's style. | 2.27.0 |
| show-arrow | `boolean` | `false` | Whether to show arrow buttons. | 2.24.0 |
| show-dots | `boolean` | `true` | Whether to show dots. | 2.24.0 |
| slides-per-view | `'auto' \| number` | `1` | Number of carousels displayed on per view. | 2.24.0 |
| space-between | `number` | `0` | The spacing between the carousels. | 2.24.0 |
| touchable | `boolean` | `true` | Whether to switch the carousel by touch. | 2.24.0 |
| transition-style | `{ transitionDuration?: string, transitionTimingFunction?: string }` | `{ transitionDuration: '300ms' }` | The style of the transition effect. | 2.24.0 |
| transition-props | `TransitionProps` | `undefined` | Custom transition effect properties, [reference](https://v3.vuejs.org/api/built-in-components.html#transition). | 2.24.0 |
| trigger | `'click' \| 'hover'` | `'click'` | The method of manual switching. |  |
| on-update:current-index | `(currentIndex: number, lastIndex: number) => void` | `undefined` | Callback function when the current index changes. | 2.24.0 |

### Carousel Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| default | `()` | Carousel content. |
| arrow | `(info: { total: number, currentIndex: number, to: (index: number) => void, prev: () => void, next: () => void })` | Arrow. | 2.24.0 |
| dots | `(info: { total: number, currentIndex: number, to: (index: number) => void })` | Dots. | 2.24.0 |

### Carousel Methods

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| to | `(index: number) => void` | Slide to index. | 2.24.0 |
| prev | `() => void` | Slide to previous page. | 2.24.0 |
| next | `() => void` | Slide to next page. | 2.24.0 |
| getCurrentIndex | `() => number` | Get current index. | 2.24.0 |
