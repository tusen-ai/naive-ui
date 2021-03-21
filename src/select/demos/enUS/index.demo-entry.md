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
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| clearable | `boolean` | `false` |  |
| default-value | `Array<string \| number> \| string \| number \| null` | `null` |  |
| disabled | `boolean` | `false` |  |
| fallback-option | `false \| (value: string \| number) => SelectOption` | `value => ({ label: '' + value, value })` | The option to be created according the value which has no corresponding option in the options of the component. If set to `false`, the fallback option won't be created and displayed and the value has no corresponding option will be viewed as a invalid value and it will be removed in the operations of the component. |
| filterable | `boolean` | `false` | Whether it can filter options. |
| filter | `(pattern: string, option: Object) => boolean` | A basic string based search method. |  |
| loading | `boolean` | `false` |  |
| max-tag-count | `number \| 'responsive'` | `undefined` | Max tag count in multiple mode. `responsive` will keep all the tags in single line. |
| multiple | `boolean` | `false` |  |
| options | `Array<SelectOption \| SelectGroupOption>` | `[]` |  |
| placeholder | `string` | `'Please Select'` |  |
| remote | `boolean` | `false` | If you want to async get options. Note that if remote is set, `filter` & `tag` won't work on `options`. At that time, you are taking all control of `options`. |
| show | `boolean` | `undefined` | Whether to show menu. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| tag | `boolean` | `false` | Whether it can create new option, should be used with `filterable`. |
| value | `Array<string \| number> \| string \| number \| null` | `undefined` |  |
| on-blur | `() => void` | `undefined` | Selection blur. |
| on-create | `(label: string) => SelectOption` | `label => ({ label, value: label })` | How to create a option when you input a string to create a option. Note that `filter` will be applied to the created option too. And make sure the value of the created option is not the same as any other option. |
| on-focus | `() => void` | `undefined` | Selection focus. |
| on-scroll | `(e: ScrollEvent) => void` | `undefined` | Menu scroll. |
| on-search | `(value: string) => void` | `undefined` |  |
| on-update:value | `(value: Array \| string \| number \| null) => void` | `undefined` | Callback of value updating. |

### SelectOption Properties

| Name     | Type                              | Description                  |
| -------- | --------------------------------- | ---------------------------- |
| class    | `string`                          |                              |
| disabled | `boolean`                         |                              |
| label    | `string`                          |                              |
| render   | `(option: SelectOption) => VNode` |                              |
| style    | `string`                          |                              |
| value    | `string \| number`                | Should be unique in options. |

### SelectGroupOption Properties

| Name     | Type                              | Description |
| -------- | --------------------------------- | ----------- |
| children | `Array<SelectOption>`             |             |
| name     | `string`                          |             |
| render   | `(option: SelectOption) => VNode` |             |
| type     | `'group'`                         |             |

## Slots

| Name   | Parameters | Description |
| ------ | ---------- | ----------- |
| action | `()`       |             |
