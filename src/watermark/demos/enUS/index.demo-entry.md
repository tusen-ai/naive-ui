# Watermark

Watermark.

## Demos

```demo
basic.vue
fullscreen.vue
image.vue
```

## API

### Watermark Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| content | `string` | `undefined` | Content of watermark. | 2.25.3 |
| cross | `boolean` | `false` | Whether to show watermark at cross position. | 2.25.3 |
| debug | `boolean` | `false` | Whether to show debug grid. | 2.25.3 |
| font-size | `number` | `14` | Font size. | 2.25.3 |
| font-family | `string` | `undefined` | Font family. | 2.25.3 |
| font-style | `` 'normal' \| 'italic' \| `oblique ${number}deg`  `` | `normal` | Font style. | 2.25.3 |
| font-variant | `string` | `''` | Font variant. | 2.25.3 |
| font-weight | `number` | `400` | Font weight. | 2.25.3 |
| font-color | `string` | `rgba(128, 128, 128, .3)` | Font color. | 2.25.3 |
| fullscreen | `boolean` | `false` | Whether to show fullscreen watermark. | 2.25.3 |
| global-rotate | `number` | `0` | Global rotate degree of the watermark. | 2.32.0 |
| line-height | `number` | `14` | Line height. | 2.25.3 |
| height | `number` | `32` | Height of watermark area. | 2.25.3 |
| image | `string` | `undefined` | The URI of watermark image. | 2.25.3 |
| image-height | `number` | `undefined` | Image height. | 2.25.3 |
| image-opacity | `number` | `1` | Image opacity. | 2.25.3 |
| image-width | `number` | `undefined` | Image width. | 2.25.3 |
| rotate | `number` | `0` | Rotate degree | 2.25.3 |
| selectable | `boolean` | `true` | Whether content covered by watermark is selectable. | 2.25.3 |
| width | `number` | `32` | Width of watermark area. | 2.25.3 |
| x-gap | `number` | `0` | Horizontal gap. | 2.25.3 |
| x-offset | `number` | `0` | Horizontal offset. | 2.25.3 |
| y-gap | `number` | `0` | Vertical gap. | 2.25.3 |
| y-offset | `number` | `0` | Vertical offset. | 2.25.3 |
| z-index | `number` | `10` | Z index of watermark. | 2.25.3 |

### Watermark Slots

| Name    | Parameters | Description              | Version |
| ------- | ---------- | ------------------------ | ------- |
| default | `()`       | something with watermark | 2.25.3  |
