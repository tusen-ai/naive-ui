# AutoComplete

Offer a search hint or maybe guess some likely options?

## Demos

```demo
basic.vue
size.vue
group.vue
custom-input.vue
after-select.vue
show-options-by-value.vue
customized-rendering.vue
status.vue
append.vue
```

## API

### AutoComplete Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| append | `boolean` | `false` | Whether to append content to input. | 2.38.0 |
| blur-after-select | `boolean` | `false` | Whether to blur after selection. |  |
| clear-after-select | `boolean` | `false` | Whether to clear after selection. |  |
| clearable | `boolean` | `false` | Whether autocomplete is clearable. |  |
| default-value | `string` | `null` | Default value of autocomplete. |  |
| disabled | `boolean` | `false` | Whether the autocomplete is disabled. |  |
| get-show | `(value: string) => boolean` | `undefined` | Use the input to determine whether to show options on focus. |  |
| input-props | `InputHTMLAttributes` | `undefined` | The attributes of input element in autocomplete. |  |
| loading | `boolean` | `false` | Whether to show a loading status. |  |
| menu-props | `HTMLAttributes` | `undefined` | The menu's dom props. | 2.32.2 |
| options | `Array<string \| AutoCompleteOption \| AutoCompleteGroupOption>` | `[]` | Options to autocomplete from. |  |
| placeholder | `string` | `'Please Input'` | Autocomplete's placeholder. |  |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | Autocomplete's placement. | 2.25.0 |
| render-label | `(option: SelectOption \| SelectGroupOption, selected: boolean) => VNodeChild` | `undefined` | Render function for each option label. | 2.24.0 |
| render-option | `(info: { node: VNode, option: SelectOption \| SelectGroupOption, selected: boolean }) => VNodeChild` | `undefined` | Render function for each option. | 2.24.0 |
| show-empty | `boolean` | `false` | Whether to show menu if there's no option. | 2.37.1 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Autocomplete size. |  |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. | 2.27.0 |
| to | `string \| HTMLElement \| false` | `body` | Container node of the menu. `false` will keep it not detached. |  |
| value | `string` | `undefined` | Input of autocomplete. |  |
| on-blur | `(event: FocusEvent) => void` | `undefined` | On blur callback function. |  |
| on-focus | `(event: FocusEvent) => void` | `undefined` | On focus callback function. |  |
| on-select | `(value: string) => void` | `undefined` | On select callback function. |  |
| on-update:value | `(value: string \| null) => void` | `undefined` | On update callback function. |  |

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
| key      | `string \| number`                    | Unique group key.       |
| type     | `'group'`                             | Required group type.    |

### AutoComplete Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| default | `(options: { handleInput: (value: string) => void, handleFocus: function, handleBlur: function, value: string, theme: string \| null })` | Custom input elements, supplied by the user. |  |
| empty | `()` | Menu's content to show when there's no option. | 2.37.1 |
| prefix | `()` | Input's prefix content. |  |
| suffix | `()` | Input's suffix content. |  |

### AutoComplete Methods

| Name  | Type         | Description              | Version |
| ----- | ------------ | ------------------------ | ------- |
| blur  | `() => void` | Blur the input element.  | 2.26.2  |
| focus | `() => void` | Focus the input element. | 2.26.2  |
