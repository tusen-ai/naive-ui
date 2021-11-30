# AutoComplete

Offer a search hint or maybe guess some likely options?

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
| clearable | `boolean` | `false` | Whether autocomplete is clearable. |
| default-value | `string` | `null` | Default value of autocomplete. |
| disabled | `boolean` | `false` | Whether the autocomplete is disabled. |
| get-show | `(value: string) => boolean` | `undefined` | Use the input to determine whether to show options on focus. |
| input-props | `HTMLInputAttributes` | `undefined` | The attributes of input element in autocomplete. |
| loading | `boolean` | `false` | Whether to show a loading status. |
| options | `Array<string \| AutoCompleteOption \| AutoCompleteGroupOption>` | `[]` | Options to autocomplete from. |
| placeholder | `string` | `'Please Input'` | Autocomplete's placeholder. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Autocomplete size. |
| value | `string` | `undefined` | Input of autocomplete. |
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

| Name     | Type                                  | Description             |
| -------- | ------------------------------------- | ----------------------- |
| children | `Array<string \| AutoCompleteOption>` | Group children options. |
| label    | `string`                              | Group label.            |
| key      | `key`                                 | Unique group key.       |
| type     | `'group'`                             | Required group type.    |

### AutoComplete Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `(options: { handleInput: (value: string) => void, handleFocus: function, handleBlur: function, value: string, theme: string \| null })` | Custom input elements, supplied by the user. |
| prefix | `()` | Input's prefix content. |
| suffix | `()` | Input's suffix content. |
