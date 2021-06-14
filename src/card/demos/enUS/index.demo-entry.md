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
| bordered | `boolean` | `true` | Whether the card shows the border |
| closable | `boolean` | `false` | Whether the card displays the close icon |
| content-style | `Object \| string` | `undefined` | Style setting of card content |
| footer-style | `Object \| string` | `undefined` | Style setting of card footer |
| header-style | `Object \| string` | `undefined` | Style setting of card header |
| hoverable | `boolean` | `false` | Whether the card can be hoverable |
| segmented | `boolean \| { [part in 'content' \| 'footer' \| 'action']?: boolean \| 'soft' \| 'hard' }` | `false` | Segmented regional settings of the card |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | Card size |
| title | `string` | `undefined` | Card title |
| on-close | `() => void` | `undefined` | Callback when the card close icon is clicked |

## Slots

| Name         | Parameters | Description                          |
| ------------ | ---------- | ------------------------------------ |
| cover        | `()`       | The content of the cover part        |
| header       | `()`       | The content of the header part       |
| header-extra | `()`       | The content of the header-extra part |
| default      | `()`       | The default content of the card      |
| footer       | `()`       | The content of the footer part       |
| action       | `()`       | The content of the action part       |
