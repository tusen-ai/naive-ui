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

## Q & A

### About QR code error correction level

The error correction level of the two-dimensional code refers to the error correction capability used in the generation of the two-dimensional code, which determines the ability of the two-dimensional code to be correctly decoded when it is damaged or partially invisible.

Two-dimensional code standards (such as QR codes) define four error correction levels: L, M, Q, and H. Each level provides different error correction capabilities and tolerance.

- 'L (Low)' : ：Provides approximately `7%` recovery capability

- `M (Middle)`：Provides approximately `15%` recovery capacity

- `Q (High)`：Provides approximately `25%` recovery capacity

- `H (Max)`：Provides approximately `30%` recovery capacity

Selecting a higher error correction level can improve the fault tolerance of the two-dimensional code, that is, it can still be correctly decoded under a certain degree of damage or deformation, but at the same time, it will increase the density of the two-dimensional code, making the two-dimensional code occupy a larger space.
