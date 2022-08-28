# Rate

Hint: If you are not very confident, think twice before changing the star's color. That can lead to a disaster.

## Demos

```demo
basic.vue
size.vue
color.vue
icon.vue
allow-half.vue
readonly.vue
clearable.vue
```

## API

### Rate Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| allow-half | `boolean` | `false` | Allow activating half of the icon. |  |
| clearable | `boolean` | `false` | Whether the rate is clearable. Value will be set to `null` if you click on current value's corresponding icon. | NEXT_VERSION |
| color | `string` | `undefined` | Activated icon color. This supports the formats: `#FFF`, `#FFFFFF`, `yellow`, `rgb(0, 0, 0)`. |  |
| count | `number` | `5` | Number of icons (max rating). |  |
| default-value | `number \| null` | `null` | Default value of activated icons. Before NEXT_VERSION default value is `null`. | NEXT_VERSION `null` |
| readonly | `boolean` | `false` | Readonly state. |  |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Icon size. |  |
| value | `number \| null` | `undefined` | Value of activated icons. |  |
| on-clear | `() => void` | `undefined` | Callback on value is cleared. | NEXT_VERSION |
| on-update:value | `(value: number) => void` | `undefined` | Callback on the value (rating) is changed. |  |

### Rate Slots

| Name    | Parameters | Description             |
| ------- | ---------- | ----------------------- |
| default | `()`       | The icon of the rating. |
