# Popselect

If you want select some options but don't want a picker, you can use popselect instead.

## Demos

```demo
basic.vue
size.vue
scrollable.vue
multiple.vue
slot.vue
```

## API

### Popselect Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| multiple | `boolean` | `false` | Whether to select multiple values. |  |
| node-props | `(option: SelectOption \| SelectGroupOption) => object` | `undefined` | Option's DOM attrs generator. | 2.30.4 |
| options | `Array<SelectOption \| SelectGroupOption>` | `[]` | For details of configuration options, see [Select](select#SelectOption-Properties) |  |
| render-label | `(option: SelectOption \| SelectGroupOption) => VNodeChild` | `undefined` | Render function of all the options. |  |
| scrollable | `boolean` | `false` | Whether the select menu is scrollable. |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the Popselect. |  |
| value | `string \| number \| Array<string \| number> \| null` | `null` | Value in controlled mode. |  |
| virtual-scroll | `boolean` | `false` | Whether to enable virtual scrolling. | 2.30.4 |
| on-update:value | `(value: string \| number \| Array<string \| number> \| null, option: SelectBaseOption \| null \| Array<SelectBaseOption>) => void` | `undefined` | Callback of value updating. |  |

For SelectOption & SelectGroupOption, see [Select](select#SelectOption-Properties)

For other props, see [Popover](popover#Popover-Props)

### Popselect Slots

| Name   | Parameters | Description                            | Version |
| ------ | ---------- | -------------------------------------- | ------- |
| action | `()`       | Options menu slot.                     | 2.22.0  |
| empty  | `()`       | Empty state slot for the options menu. | 2.22.0  |
