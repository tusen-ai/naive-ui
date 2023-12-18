# QR Code

It is always only valid for a short time.

## Demos

```demo
basic.vue
icon.vue
size.vue
color.vue
error-correction.vue
download.vue
```

## API

### QR Code Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| background-color | `string` | `'#FFF'` | QR code background color, Values need to be in `hex` format. | 2.36.0 |
| color | `string` | `'#000'` | QR code color, Values need to be in `hex` format. | 2.36.0 |
| error-correction-level | `'L'` \| `'M'` \| `'Q'` \| `'H'` | `'M'` | QR code error correction level. | 2.36.0 |
| icon-border-radius | `number` | `4` | Icon background's border-radius | 2.36.0 |
| icon-background-color | `string` | `'#FFF'` | Icon's background color. | 2.36.0 |
| icon-size | `number` | `40` | Icon's size. | 2.36.0 |
| icon-src | `string` | `undefined` | Icon's URL. | 2.36.0 |
| padding | `number \| string` | `12` | Padding size of the QR Code. | 2.36.0 |
| value | `string` | `''` | Text information. | 2.36.0 |
| size | `number` | `100` | Size of the qrcode. | 2.36.0 |

### About QR code error correction level

The error correction level of the two-dimensional code refers to the error correction capability used in the generation of the two-dimensional code, which determines the ability of the two-dimensional code to be correctly decoded when it is damaged or partially invisible.

Two-dimensional code standards (such as QR codes) define four error correction levels: L, M, Q, and H. Each level provides different error correction capabilities and tolerance.

- `L (Low)`: Provides approximately `7%` recovery capability.

- `M (Middle)`: Provides approximately `15%` recovery capacity.

- `Q (High)`: Provides approximately `25%` recovery capacity.

- `H (Max)`: Provides approximately `30%` recovery capacity.

Selecting a higher error correction level can improve the fault tolerance of the two-dimensional code, that is, it can still be correctly decoded under a certain degree of damage or deformation, but at the same time, it will increase the density of the two-dimensional code, making the two-dimensional code occupy a larger space.
