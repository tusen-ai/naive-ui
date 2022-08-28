# Card

Just put something in it.

## Demos

```demo
basic.vue
size.vue
cover.vue
hoverable.vue
slots.vue
border.vue
segment.vue
closable.vue
no-title.vue
loading.vue
custom-style.vue
embedded.vue
```

## Card

### Card Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether to show the card border. |  |
| closable | `boolean` | `false` | Is it allowed to close. |  |
| close-style | ``Object \| string` | The style of the close button. | NEXT_VERSION |
| content-style | `Object \| string` | `undefined` | The style of the card content area. |  |
| embedded | `boolean` | `false` | >>>使用更深的背景色展现嵌入效果，只对亮色主题生效<<< |  |
| footer-style | `Object \| string` | `undefined` | The style of the bottom area of the card. |  |
| header-style | `Object \| string` | `undefined` | The style of the card head area. |  |
| header-extra-style | `Object \| string` | `undefined` | The style of the card head extra area. | 2.25.0 |
| hoverable | `boolean` | `false` | Whether to show shadow when hovering on the card. |  |
| segmented | `boolean \| { [part in 'content' \| 'footer' \| 'action']?: boolean \| 'soft' }` | `false` | Segment divider settings of the card. |  |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | Card size. |  |
| title | `string` | `undefined` | Card title. |  |
| on-close | `() => void` | `undefined` | Callback function triggered upon closing the card. |  |

### Card Slots

| Name         | Parameters | Description             | Version      |
| ------------ | ---------- | ----------------------- | ------------ |
| cover        | `()`       | Cover content.          |              |
| close-icon   | `()`       | Close icon.             | NEXT_VERSION |
| header       | `()`       | Header content.         |              |
| header-extra | `()`       | Header extra content.   |              |
| default      | `()`       | Card content.           |              |
| footer       | `()`       | Footer content.         |              |
| action       | `()`       | Operating area content. |              |
