# Card

Some amatuer UI designers like to apply shadow on every cards.

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
| bordered | `boolean` | `true` |  |
| closable | `boolean` | `false` |  |
| content-style | `Object \| string` | `undefined` |  |
| footer-style | `Object \| string` | `undefined` |  |
| header-style | `Object \| string` | `undefined` |  |
| hoverable | `boolean` | `false` |  |
| segmented | `boolean \| { [part in 'content' \| 'footer' \| 'action']?: boolean \| 'soft' \| 'hard' }` | `false` |  |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` |  |
| title | `string` | `undefined` |  |
| on-close | `() => void` | `undefined` |  |

## Slots

| Name         | Parameters | Description |
| ------------ | ---------- | ----------- |
| cover        | `()`       |             |
| header       | `()`       |             |
| header-extra | `()`       |             |
| default      | `()`       |             |
| footer       | `()`       |             |
| action       | `()`       |             |
