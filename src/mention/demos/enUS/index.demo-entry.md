# Mention

A year ago, product manager ask me if I could implement the feature. At that time, I told them to use multiple select as a workaround.

## Demos

```demo
basic
textarea
async
autosize
form
render-label
custom-prefix
manual-trigger
```

## Props

Mention is provided after `v2.2.0`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| autosize | `boolean \| { maxRows?: number, minRows?: number }` | `false` | Autosize. |
| options | `MentionOption[]` | `[]` | Mention Options list. |
| type | `'text' \| 'textarea'` | `'text'` | Input type. |
| separator | `string` | `' '` | Char to split mentions whose length must be 1. |
| bordered | `boolean` | `true` | Whether to display the border of the input box. |
| disabled | `boolean` | `false` | Whether to set the input box to be disabled. |
| value | `string \| null` | `undefined` | Input value. |
| default-value | `string` | `''` | Input default value. |
| loading | `boolean` | `false` | Whether the selection panel of mentions shows the loading status. |
| prefix | `string \| string[]` | `'@'` | Prefix char to trigger mentions whose length must be 1. |
| placeholder | `string` | `''` | Input placeholder. |
| render-label | `undefined \| (option: MentionOption) => VNodeChild` | `undefined` | Render function of all the options' label. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Input size. |
| on-update:value | `(value: string) => void` | `undefined` | Triggered when the input box value is updated. |
| on-select | `(option: MentionOption, prefix: string) => void` | `undefined` | Triggered when the input box is selected. |
| on-focus | `(e: FocusEvent) => void` | `undefined` | Triggered when the input box gets focus. |
| on-search | `(pattern: string, prefix: string) => void` | `undefined` | Triggered when searching in the input box. |
| on-blur | `(e: FocusEvent) => void` | `undefined` | Triggered when the input box loses focus. |

### MentionOption Properties

| Name | Type | Description |
| --- | --- | --- |
| class | `string` | Option class name. |
| disabled | `boolean` | Option disabled status. |
| label | `string \| (option: MentionOption) => VNodeChild` | Option label. |
| render | `(option: MentionOption) => VNodeChild` | Support custom options via `render` rendering function. |
| style | `string` | Option style. |
| value | `string` | Should be unique. |

### Mention Methods

| Name  | Type         | Description                   |
| ----- | ------------ | ----------------------------- |
| focus | `() => void` | Manually focus the component. |
| blur  | `() => void` | Manually blur the component.  |

### Mention Slots

| Name  | Parameters | Description                 |
| ----- | ---------- | --------------------------- |
| empty | `()`       | Slot when menu has no data. |
