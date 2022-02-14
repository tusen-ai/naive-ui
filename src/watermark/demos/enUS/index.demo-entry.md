# Watermark

Watermark.

## Demos

```demo
basic.vue
```

## API

### Watermark Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| content | `string` | `undefined` | content of watermark | NEXT_VERSION |
| cross | `boolean` | `false` | whetcher show watermark when cross the border | NEXT_VERSION |
| debug | `boolean` | `false` | whether show debug info | NEXT_VERSION |
| font-size | `number` | `14` | size of font | NEXT_VERSION |
| font-family | `string` | `undefined` | font family | NEXT_VERSION |
| font-style | `'normal' \| 'italic' \| oblique ${number}deg` | `normal` | style of font | NEXT_VERSION |
| font-variant | `string` | `''` | font variant | NEXT_VERSION |
| font-Weight | `number` | `400` | font weight | NEXT_VERSION |
| font-color | `string` | `rgba(0,0,0,.15)` | color of font | NEXT_VERSION |
| font-strengths | `string` | `''` | face for font | NEXT_VERSION |
| line-height | `number` | `14` | height of a line | NEXT_VERSION |
| height | `number` | `32` | height of watermark | NEXT_VERSION |
| image | `string` | `undefined` | the URI for image | NEXT_VERSION |
| rotate | `number` | `0` | rotate degree | NEXT_VERSION |
| selectable | `boolean` | `true` | whether selectable when coverd by watermark | NEXT_VERSION |
| width | `number` | `32` | width of watermark | NEXT_VERSION |
| x-gap | `number` | `0` | gap of x | NEXT_VERSION |
| x-offset | `number` | `0` | offset of x | NEXT_VERSION |
| y-gap | `number` | `0` | gap of y | NEXT_VERSION |
| y-offset | `number` | `0` | offset of y | NEXT_VERSION |
| z-index | `number` | `10` | height of z index | NEXT_VERSION |

### Watermark Slots

| Name    | Parameters | Description              | Version      |
| ------- | ---------- | ------------------------ | ------------ |
| default | `()`       | something with watermark | NEXT_VERSION |
