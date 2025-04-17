# Segment

Display multiple options and allow users to select a single option.

Available since 2.41.1.

## Demos

```demo
basic.vue
vertical.vue
disabled.vue
block.vue
custom-option.vue
size.vue
rtl-debug.vue
```

## API

### Segment Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| value | `string \| number \| boolean` | - | The currently selected segment value. |  |
| default-value | `string \| number \| boolean` | `null` | The default checked value. |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size |  |
| disabled | `boolean` | `false` | Disabled state. |  |
| vertical | `boolean` | `false` | Whether to separate vertically. |  |
| block | `boolean` | `false` | Whether is displayed as a block-level element. |  |
| options | `Array<SegmentItemType>` | `[]` | Options of the segment group. |  |
| on-update:value | `(value: string \| number \| boolean) => void` | `undefined` | On update callback function. |

### Segment Slots

| 名称  | 参数 | 说明                     |
| ----- | ---- | ------------------------ |
| label | `()` | Segment option rendering |
