# Mention

A year ago, my product manager asked me if I could implement this feature. Back then, I recommended just using multiple selects as a workaround.

## Demos

```demo
basic.vue
textarea.vue
async.vue
autosize.vue
form.vue
render-label.vue
custom-prefix.vue
manual-trigger.vue
status.vue
```

## API

### Mention Props

Mention requires `v2.2.0` and above.

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| autosize | `boolean \| { maxRows?: number, minRows?: number }` | `false` | Autosize. |  |
| options | `MentionOption[]` | `[]` | Mention options list. |  |
| type | `'text' \| 'textarea'` | `'text'` | Input type. |  |
| separator | `string` | `' '` | Character to split mentions. The string length must be exactly 1. |  |
| bordered | `boolean` | `true` | Whether to display the border of the input element. |  |
| disabled | `boolean` | `false` | Whether to disable the input element. |  |
| value | `string \| null` | `undefined` | Manually set input value. |  |
| default-value | `string` | `''` | Default value when the value is not manually set. |  |
| loading | `boolean` | `false` | Whether the selection panel of mentions is in a loading state. |  |
| prefix | `string \| string[]` | `'@'` | Prefix character(s) to trigger mentions. The string length(s) must be exactly 1. |  |
| placeholder | `string` | `''` | Placeholder. |  |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | Selection panel's placement . | 2.25.0 |
| render-label | `(option: MentionOption) => VNodeChild` | `undefined` | Options' labels render function. |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Input size. |  |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. | 2.27.0 |
| to | `string \| HTMLElement \| false` | `body` | Container node of the menu. `false` will keep it not detached. |  |
| on-update:show | `(show: boolean) => void` | `undefined` | Callback when the selection panel of mentions is shown or hidden. | 2.34.0 |
| on-update:value | `(value: string) => void` | `undefined` | Triggered when the input box value is updated. |  |
| on-select | `(option: MentionOption, prefix: string) => void` | `undefined` | Triggered when the input box is selected. |  |
| on-focus | `(e: FocusEvent) => void` | `undefined` | Triggered when the input box is focussed on. |  |
| on-search | `(pattern: string, prefix: string) => void` | `undefined` | Triggered when searching in the input box. |  |
| on-blur | `(e: FocusEvent) => void` | `undefined` | Triggered when the input box loses focus. |  |

### MentionOption Properties

| Name | Type | Description |
| --- | --- | --- |
| class | `string` | Option class property. |
| disabled | `boolean` | Option disabled state. |
| label | `string \| (option: MentionOption) => VNodeChild` | Option label. |
| render | `(option: MentionOption) => VNodeChild` | Support custom options via `render` rendering function. |
| style | `string` | Option style property. |
| value | `string` | Option value. Must be unique. |

### Mention Methods

| Name  | Type         | Description                      |
| ----- | ------------ | -------------------------------- |
| focus | `() => void` | Manually focus on the component. |
| blur  | `() => void` | Manually blur the component.     |

### Mention Slots

| Name  | Parameters | Description                 |
| ----- | ---------- | --------------------------- |
| empty | `()`       | Slot when menu has no data. |
