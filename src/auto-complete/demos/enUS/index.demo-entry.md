# Auto Complete

Use as a search hint or something similar.

## Demos

```demo
basic
size
group
custom-input
after-select
show-options-by-value
```

## API

### AutoComplete Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| blur-after-select | `boolean` | `false` | Whether to blur after selection. |
| clear-after-select | `boolean` | `false` | Whether to clear after selection. |
| clearable | `boolean` | `false` | Whether auto complete is clearable. |
| default-value | `string` | `null` | Default value of auto complete. |
| disabled | `boolean` | `false` | Whether the auto complete is disabled. |
| get-show | `(value: string \| null) => boolean` | `undefined` | Based on value to determine whether to show menu when focusing. |
| loading | `boolean` | `false` | Whether to show a loading status. |
| options | `Array<string \| AutoCompleteOption \| AutoCompleteGroupOption>` | `[]` | Auto complete options. |
| placeholder | `string` | `'Please Input'` | Auto complete's placeholder. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Auto complete size. |
| value | `string` | `undefined` | Value of auto complete if being manually set. |
| on-blur | `(event: FocusEvent) => void` | `undefined` | On blur callback function. |
| on-focus | `(event: FocusEvent) => void` | `undefined` | On focus callback function. |
| on-select | `(value: string) => void` | `undefined` | On select callback function. |
| on-update:value | `(value: string \| null) => void` | `undefined` | On update callback function. |

#### AutoCompleteOption Properties

| Name     | Type      | Description                     |
| -------- | --------- | ------------------------------- |
| disabled | `boolean` | Whether the option is disabled. |
| label    | `string`  | Option label value.             |
| value    | `string`  | Option ID (should be unique).   |

#### AutoCompleteGroupOption Properties

| Name | Type | Description |
| --- | --- | --- |
| children | `Array<string \| AutoCompleteOption>` | Children options of AutoCompleteGroupOption. |
| label | `string` | The name of the AutoCompleteGroupOption. |
| label | `key` | The key of the AutoCompleteGroupOption. |
| type | `'group'` | The type of the AutoCompleteGroupOption. |

### AutoComplete Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `(options: { handleInput: (value: string) => void, handleFocus: function, handleBlur: function, value: string, theme: string \| null })` | Custom input elements, supplied by the user. |
