# Mention

A year ago, product manager ask me if I could implement the feature. At that time, I told them to use multiple select as a workaround.

## Demos

```demo
basic
textarea
async
autosize
form
custom-prefix
```

## Props

Mention is provided after `v2.2.0`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| autosize | `boolean \| { maxRows?: number, minRows?: number }` | `false` |  |
| options | `MentionOption[]` | `[]` |  |
| type | `'input' \| 'textarea'` | `'input'` |  |
| separator | `string` | `' '` | Char to split mentions whose length must be 1. |
| bordered | `boolean` | `true` |  |
| disabled | `boolean` | `false` |  |
| value | `string \| null` | `undefined` |  |
| default-value | `string` | `''` |  |
| loading | `boolean` | `false` |  |
| prefix | `string \| string[]` | `'@'` | Prefix char to trigger mentions whose length must be 1. |
| placeholder | `string` | `''` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| on-update:value | `(value: string) => void` | `undefined` |  |
| on-select | `(option: MentionOption, prefix: string) => void` | `undefined` |  |
| on-focus | `(e: FocusEvent) => void` | `undefined` |  |
| on-search | `(pattern: string, prefix: string) => void` | `undefined` |  |
| on-blur | `(e: FocusEvent) => void` | `undefined` |  |

### MentionOption Properties

| Name     | Type                                    | Description      |
| -------- | --------------------------------------- | ---------------- |
| class    | `string`                                |                  |
| disabled | `boolean`                               |                  |
| label    | `string`                                |                  |
| render   | `(option: MentionOption) => VNodeChild` |                  |
| style    | `string`                                |                  |
| value    | `string`                                | Should be unique |
