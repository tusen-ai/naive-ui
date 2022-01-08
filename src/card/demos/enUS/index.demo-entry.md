# Card

Just put something in it.

## Demos

```demo
basic
size
cover.vue
hoverable
slots
border
segment
closable
no-title
loading
custom-style
embedded.vue
```

## Card

### Card Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether to show the card border. |
| closable | `boolean` | `false` | Is it allowed to close. |
| content-style | `Object \| string` | `undefined` | The style of the card content area. |
| footer-style | `Object \| string` | `undefined` | The style of the bottom area of the card. |
| header-style | `Object \| string` | `undefined` | The style of the card head area. |
| hoverable | `boolean` | `false` | Whether to show shadow when hovering on the card. |
| segmented | `boolean \| { [part in 'content' \| 'footer' \| 'action']?: boolean \| 'soft' \| 'hard' }` | `false` | Segment divider settings of the card. |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | Card size. |
| title | `string` | `undefined` | Card title. |
| on-close | `() => void` | `undefined` | Callback function triggered upon closing the card. |

### Card Slots

| Name         | Parameters | Description             |
| ------------ | ---------- | ----------------------- |
| cover        | `()`       | Cover content.          |
| header       | `()`       | Header content.         |
| header-extra | `()`       | Header extra content.   |
| default      | `()`       | Card content.           |
| footer       | `()`       | Footer content.         |
| action       | `()`       | Operating area content. |
