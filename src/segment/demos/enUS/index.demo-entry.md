# Segment

Display multiple options and allow users to select a single option.

Available since `NEXT_VERSION`.

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
| value | `string \| number` | - | The currently selected segment value. | NEXT_VERSION |
| default-value | `string \| number` | `null` | The default checked value. | NEXT_VERSION |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size | NEXT_VERSION |
| disabled | `boolean` | `false` | Disabled state. | NEXT_VERSION |
| vertical | `boolean` | `false` | Whether to separate vertically. | NEXT_VERSION |
| block | `boolean` | `false` | Whether is displayed as a block-level element. | NEXT_VERSION |
| name | `string` | `undefined` | The name attribute of all input[type="radio"] elements under Segment uses a randomly generated name if not set. | NEXT_VERSION |
| options | `Array<SegmentItemType>` | `[]` | Options of the segment group. | NEXT_VERSION |
| on-update:value | `(value: string \| number) => void` | `undefined` | On update callback function. | NEXT_VERSION |

### SegmentItemType Properties

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| value | `string \| number` | - | Value for Segment item | NEXT_VERSION |
| label | `string` | - | Display text for Segment item | NEXT_VERSION |
| disabled? | `boolean` | `false` | Disabled state of segment item | NEXT_VERSION |

### Segment Slots

| Name | Parameters | Type Alias | Description | Version |
| --- | --- | --- | --- | --- |
| default | `(value: string \| number; label: string \| number)` | `SegmentDefaultSlot` | Segment option rendering | NEXT_VERSION |
