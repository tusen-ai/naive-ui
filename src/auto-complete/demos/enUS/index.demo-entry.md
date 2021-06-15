# Auto Complete

Use as search hint or something similar.

## Demos

```demo
basic
size
group
custom-input
after-select
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| blur-after-select | `boolean` | `false` | Whether to blur after selection |
| clear-after-select | `boolean` | `false` | Whether to clear after selection |
| clearable | `boolean` | `false` | Does Auto Complete support clearable |
| default-value | `string` | `null` | Auto Complete default value  |
| disabled | `boolean` | `false` | Whether Auto Complete is disabled |
| options | `Array<string \| AutoCompleteOption \| AutoCompleteGroupOption>` | `[]` | Custom options for Auto Complete |
| placeholder | `string` | `'Please Input'` | Auto Complete prompt information |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Auto Complete size |
| value | `string` | `undefined` | Auto Complete data user controllable |
| on-blur | `(event: FocusEvent) => void` | `undefined` | Callback function triggered when blur |
| on-focus | `(event: FocusEvent) => void` | `undefined` | Callback function triggered when focus |
| on-select | `(value: string) => void` | `undefined` | Callback function triggered when select is selected |
| on-update:value | `(value: string \| null) => void` | `undefined` | Callback function triggered when controllable data is updated |

### AutoCompleteOption Properties

| Name     | Type               | Description                  |
| -------- | ------------------ | ---------------------------- |
| disabled | `boolean`          | Whether to disable           |
| label    | `string`           | Displayed label value        |
| render   | `Function`         | Custom rendering function    |
| value    | `string \| number` | Should be unique in options. |

### AutoCompleteGroupOption Properties

| Name     | Type                                  | Description |
| -------- | ------------------------------------- | ----------- |
| children | `Array<string \| AutoCompleteOption>` | Children item of AutoCompleteGroup |
| name     | `string`                              | The name of the AutoCompleteGroup |
| type     | `'group'`                             | The type of the AutoCompleteGroup|

## Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `(options: { handleInput: (value: string) => void, handleFocus: function, handleBlur: function, value: string, theme: string \| null })` | Custom input elements, filled by the user |
