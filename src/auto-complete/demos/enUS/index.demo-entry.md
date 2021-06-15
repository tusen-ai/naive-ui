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
| blur-after-select | `boolean` | `false` | Whether to blur after selection. |
| clear-after-select | `boolean` | `false` | Whether to clear after selection. |
| clearable | `boolean` | `false` | Does auto complete support clearable. |
| default-value | `string` | `null` | Default value of auto complete. |
| disabled | `boolean` | `false` | Whether the auto complete is disabled. |
| options | `Array<string \| AutoCompleteOption \| AutoCompleteGroupOption>` | `[]` | Options of the auto complete. |
| placeholder | `string` | `'Please Input'` | Auto complete's prompt information. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Auto complete size. |
| value | `string` | `undefined` | Value of auto complete in controlled mode. |
| on-blur | `(event: FocusEvent) => void` | `undefined` | Callback function triggered when blur. |
| on-focus | `(event: FocusEvent) => void` | `undefined` | Callback function triggered when focus. |
| on-select | `(value: string) => void` | `undefined` | Callback function triggered when an option is selected. |
| on-update:value | `(value: string \| null) => void` | `undefined` | Callback function triggered when controllable data is updated. |

### AutoCompleteOption Properties

| Name     | Type               | Description                    |
| -------- | ------------------ | ------------------------------ |
| disabled | `boolean`          | Whether to disable the option. |
| label    | `string`           | Displayed label value.         |
| render   | `Function`         | Custom rendering function.     |
| value    | `string \| number` | Should be unique in options.   |

### AutoCompleteGroupOption Properties

| Name | Type | Description |
| --- | --- | --- |
| children | `Array<string \| AutoCompleteOption>` | Children options of AutoCompleteGroup. |
| name | `string` | The name of the AutoCompleteGroup. |
| type | `'group'` | The type of the AutoCompleteGroup. |

## Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `(options: { handleInput: (value: string) => void, handleFocus: function, handleBlur: function, value: string, theme: string \| null })` | Custom input elements, filled by the user. |
