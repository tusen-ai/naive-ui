# Rate

If you not very confident, be careful about changing star's color. That will be a disaster.

## Demos

```demo
basic
size
color
icon
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| count | `number` | `5` | Icon count. |
| color | `string` | `undefined` | Icon color activated(support `#FFF`, `#FFFFFF`, `yellow`,`rgb(0, 0, 0)` formatted colors). |
| value | `number` | `undefined` | Value of activated icons. |
| default-value | `number` | `0` | Value of activated icons by default. |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Icon size. |
| on-update:value | `(value: number) => void` | `undefined` | Callback when update value. |

## Slots

| Name    | Parameters | Description           |
| ------- | ---------- | --------------------- |
| default | `()`       | The icon of the rate. |
