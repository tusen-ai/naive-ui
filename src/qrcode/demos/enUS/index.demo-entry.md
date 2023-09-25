# Qrcode

Like a humorous magician, he skillfully turns tedious information into a mysterious QR code

## 演示

```demo
basic.vue
border.vue
size.vue
color.vue
error-correction.vue
```

## API

### Qrcode Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| bg-color | `string` | `#FFF` | Qr code background color, Values need to be in `hex` format. |  |
| bordered | `boolean` | `true` | Whether to show the qrcode border. |  |
| color | `string` | `#000` | Qr code color, Values need to be in `hex` format. |  |
| error-correction-level | `L` \| `M` \| `Q` \| `H` | `M` | Qr code error correction level. |
| value | `string` | `-` | Text information. |  |
| size | `number` | `160` | Size of the qrcode. |
