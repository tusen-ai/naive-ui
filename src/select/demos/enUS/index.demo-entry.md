# Select

Select something!

## Demo

```demo
basic
size
multiple
events
filterable
tag
menu-width
remote
remote-multiple
clearable
scroll-event
group
many-options
custom-option
action
fallback-option
max-tag-count
add-tooltip
render-tag
```

## API

### Select Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| consistent-menu-width | `boolean` | `true` | Whether the menu keeps its width the same as select trigger. Set it to `false` will disable `virtual-scroll`. |
| clearable | `boolean` | `false` | Whether the value is clearable. |
| default-value | `Array<string \| number> \| string \| number \| null` | `null` | Default value in uncontrolled mode. |
| disabled | `boolean` | `false` | Whether to disable the select. |
| fallback-option | `false \| (value: string \| number) => SelectOption` | `value => ({ label: '' + value, value })` | The option to be created according the value which has no corresponding option in the options of the component. If set to `false`, the fallback option won't be created and displayed and the value has no corresponding option will be viewed as a invalid value and it will be removed in the operations of the component. |
| filterable | `boolean` | `false` | Whether it can filter options. |
| filter | `(pattern: string, option: Object) => boolean` | A basic string based search method. | Filter function. |
| loading | `boolean` | `false` | Whether to show loading status. |
| max-tag-count | `number \| 'responsive'` | `undefined` | Max tag count in multiple mode. `responsive` will keep all the tags in single line. |
| multiple | `boolean` | `false` | Whether to select multiple values. |
| options | `Array<SelectOption \| SelectGroupOption>` | `[]` | For details of configuration options, see SelectOption Properties. |
| placeholder | `string` | `'Please Select'` | Placeholder of select. |
| remote | `boolean` | `false` | If you want to async get options. Note that if remote is set, `filter` & `tag` won't work on `options`. At that time, you are taking all control of `options`. |
| render-label | `(option: SelectOption \| SelectGroupOption, selected: boolean) => VNodeChild` | `undefined` | Render function of all the options' label. |
| render-option | `(info: { node: VNode, option: SelectOption \| SelectGroupOption, selected: boolean } }` | `undefined` | Render function of all the options. |
| render-tag | `(option: SelectBaseOption, onClose: () => void) => VNodeChild` | `undefined` | Render function of all the tag. |
| show | `boolean` | `undefined` | Whether to show menu. |
| show-arrow | `boolean` | `true` | Whether to show arrow. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the select input. |
| tag | `boolean` | `false` | Whether it can create new option, should be used with `filterable`. |
| value | `Array<string \| number> \| string \| number \| null` | `undefined` | Value in controlled mode. |
| virtual-scroll | `boolean` | `true` | Whether to enable virtual scrolling. |
| on-blur | `() => void` | `undefined` | Callback triggered when selection blur. |
| on-clear | `() => void` | `undefined` | Callback triggered when selection clear. |
| on-create | `(label: string) => SelectOption` | `label => ({ label, value: label })` | How to create a option when you input a string to create a option. Note that `filter` will be applied to the created option too. And make sure the value of the created option is not the same as any other option. |
| on-focus | `() => void` | `undefined` | Callback triggered when selection focus. |
| on-scroll | `(e: ScrollEvent) => void` | `undefined` | Callback triggered when menu scroll. |
| on-search | `(value: string) => void` | `undefined` | Callback triggered when search. |
| on-update:value | `(value: Array \| string \| number \| null) => void` | `undefined` | Callback triggered when value updating. |

### SelectOption Properties

| Name | Type | Description |
| --- | --- | --- |
| class | `string` | Customize the class name of the option. |
| disabled | `boolean` | Whether to disable the option. |
| label | `string \| ((option: SelectOption, selected: boolean) => VNodeChild)` | Label of the option. Note that if you are using render function, the default filter will filter the option. |
| render | `(info: { node: VNode }) => VNodeChild` | Render the entire option. |
| style | `string` | Customize the style of the option. |
| value | `string \| number` | Should be unique in options. |

### SelectGroupOption Properties

| Name | Type | Description |
| --- | --- | --- |
| children | `Array<SelectOption>` | Child select options. |
| label | `string \| ((option: SelectGroupOption) => VNodeChild)` | Label of the group option. |
| key | `string \| number` | Should be unique in options. |
| render | `(info: { node: VNode }) => VNodeChild` | Render the entire option. |
| type | `'group'` | Type of the group option. |

### Select Slots

| Name   | Parameters | Description                  |
| ------ | ---------- | ---------------------------- |
| action | `()`       | Slot in menu operation area. |
| empty  | `()`       | Slot when menu has no data.  |
