# Segment

Display multiple options and allow users to select a single option.

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
