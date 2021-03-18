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
| blur-after-select | `boolean` | `false` |  |
| clear-after-select | `boolean` | `false` |  |
| clearable | `boolean` | `false` |  |
| default-value | `string` | `null` |  |
| disabled | `boolean` | `false` |  |
| options | `Array<string \| AutoCompleteOption \| AutoCompleteGroupOption>` | `[]` |  |
| placeholder | `string` | `'Please Input'` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| value | `string` | `undefined` |  |
| on-blur | `(event: FocusEvent) => void` | `undefined` |  |
| on-focus | `(event: FocusEvent) => void` | `undefined` |  |
| on-select | `(value: string) => void` | `undefined` |  |
| on-update:value | `(value: string \| null) => void` | `undefined` |  |

### AutoCompleteOption Properties

| Name     | Type               | Description                  |
| -------- | ------------------ | ---------------------------- |
| disabled | `boolean`          |                              |
| label    | `string`           |                              |
| render   | `Function`         |                              |
| value    | `string \| number` | Should be unique in options. |

### AutoCompleteGroupOption Properties

| Name     | Type          | Description          |
| -------- | ------------- | -------------------- | --- |
| children | `Array<string | AutoCompleteOption>` |     |
| name     | `string`      |                      |
| type     | `'group'`     |                      |

## Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `(options: { handleInput: (value: string) => void, handleFocus: function, handleBlur: function, value: string, theme: string \| null })` |  |
