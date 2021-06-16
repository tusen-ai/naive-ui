# Card

Just put something in it.

## Demos

```demo
basic
size
cover
hoverable
slots
border
segment
closable
loading
no-title
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether the card shows the border. |
| closable | `boolean` | `false` | Whether the card displays the close icon. |
| content-style | `Object \| string` | `undefined` | Style of the card content. |
| footer-style | `Object \| string` | `undefined` | Style of the card footer. |
| header-style | `Object \| string` | `undefined` | Style of the card header. |
| hoverable | `boolean` | `false` | Whether to show shadow when hovering on the card. |
| segmented | `boolean \| { [part in 'content' \| 'footer' \| 'action']?: boolean \| 'soft' \| 'hard' }` | `false` | Segment divider settings of the card. |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | Card size. |
| title | `string` | `undefined` | Card title. |
| on-close | `() => void` | `undefined` | Callback function triggered upon closing the card. |

## Slots

| Name         | Parameters | Description                           |
| ------------ | ---------- | ------------------------------------- |
| cover        | `()`       | The content of the cover part.        |
| header       | `()`       | The content of the header part.       |
| header-extra | `()`       | The content of the header-extra part. |
| default      | `()`       | The default content of the card.      |
| footer       | `()`       | The content of the footer part.       |
| action       | `()`       | The content of the action part.       |
