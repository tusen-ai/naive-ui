# Rate

If you not very confident, be careful about changing star's color. That will be a disaster.

## Demos

```demo
basic
size
color
icon
allow-half
readonly
```

## API

### Rate Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| allow-half | `boolean` | `false` | Allow activated half of the icon. |
| color | `string` | `undefined` | Icon color activated(support `#FFF`, `#FFFFFF`, `yellow`,`rgb(0, 0, 0)` formatted colors). |
| count | `number` | `5` | Icon count. |
| default-value | `number` | `0` | Value of activated icons by default. |
| readonly | `boolean` | `false` | Read only. |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Icon size. |
| value | `number` | `undefined` | Value of activated icons. |
| on-update:value | `(value: number) => void` | `undefined` | Callback when update value. |

### Rate Slots

| Name    | Parameters | Description           |
| ------- | ---------- | --------------------- |
| default | `()`       | The icon of the rate. |
