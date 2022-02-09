# Rate

Hint: If you are not very confident, think twice before changing the star's color. That can lead to a disaster.

## Demos

```demo
basic
size
color
icon.vue
allow-half
readonly
```

## API

### Rate Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| allow-half | `boolean` | `false` | Allow activating half of the icon. |
| color | `string` | `undefined` | Activated icon color. This supports the formats: `#FFF`, `#FFFFFF`, `yellow`, `rgb(0, 0, 0)`. |
| count | `number` | `5` | Number of icons (max rating). |
| default-value | `number` | `0` | Default value of activated icons. |
| readonly | `boolean` | `false` | Readonly state. |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Icon size. |
| value | `number` | `undefined` | Value of activated icons. |
| on-update:value | `(value: number) => void` | `undefined` | Callback when the value (rating) is changed. |

### Rate Slots

| Name    | Parameters | Description             |
| ------- | ---------- | ----------------------- |
| default | `()`       | The icon of the rating. |
