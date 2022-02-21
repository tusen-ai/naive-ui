# Watermark

Watermark.

## Demos

```demo
basic.vue
fullscreen.vue
```

## API

### Watermark Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| content | `string` | `undefined` | Content of watermark. | NEXT_VERSION |
| cross | `boolean` | `false` | Whether to show watermark at cross position. | NEXT_VERSION |
| debug | `boolean` | `false` | Whether to show debug grid. | NEXT_VERSION |
| font-size | `number` | `14` | Font size. | NEXT_VERSION |
| font-family | `string` | `undefined` | Font family. | NEXT_VERSION |
| font-style | `` 'normal' \| 'italic' \| `oblique ${number}deg`  `` | `normal` | Font style. | NEXT_VERSION |
| font-variant | `string` | `''` | Font variant. | NEXT_VERSION |
| font-weight | `number` | `400` | Font weight. | NEXT_VERSION |
| font-color | `string` | `rgba(0,0,0,.15)` | Font color. | NEXT_VERSION |
| fullscreen | `boolean` | `false` | Whether to show fullscreen watermark. | NEXT_VERSION |
| line-height | `number` | `14` | Line height. | NEXT_VERSION |
| height | `number` | `32` | Height of watermark area. | NEXT_VERSION |
| image | `string` | `undefined` | The URI of watermark image. | NEXT_VERSION |
| rotate | `number` | `0` | Rotate degree | NEXT_VERSION |
| selectable | `boolean` | `true` | Whether content covered by watermark is selectable. | NEXT_VERSION |
| width | `number` | `32` | Width of watermark area. | NEXT_VERSION |
| x-gap | `number` | `0` | Horizontal gap. | NEXT_VERSION |
| x-offset | `number` | `0` | Horizontal offset. | NEXT_VERSION |
| y-gap | `number` | `0` | Vertical gap. | NEXT_VERSION |
| y-offset | `number` | `0` | Vertical offset. | NEXT_VERSION |
| z-index | `number` | `10` | Z index of watermark. | NEXT_VERSION |

### Watermark Slots

| Name    | Parameters | Description              | Version      |
| ------- | ---------- | ------------------------ | ------------ |
| default | `()`       | something with watermark | NEXT_VERSION |
