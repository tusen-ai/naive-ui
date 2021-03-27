# 提及 Mention

一年多之前产品经理问我能不能搞这个东西，当时我让他们用多选凑活一下。

## 演示

```demo
basic
textarea
async
autosize
form
custom-prefix
```

## Props

Mention 在 `v2.2.0` 及以后可用。

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| autosize | `boolean \| { maxRows?: number, minRows?: number }` | `false` |  |
| options | `MentionOption[]` | `[]` |  |
| type | `'input' \| 'textarea'` | `'input'` |  |
| separator | `string` | `' '` | 切分提及使用的字符，长度必须为 1 |
| bordered | `boolean` | `true` |  |
| disabled | `boolean` | `false` |  |
| value | `string \| null` | `undefined` |  |
| default-value | `string` | `''` |  |
| loading | `boolean` | `false` |  |
| prefix | `string \| string[]` | `'@'` | 触发提及的前缀，长度必须为 1 |
| placeholder | `string` | `''` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| on-update:value | `(value: string) => void` | `undefined` |  |
| on-select | `(option: MentionOption, prefix: string) => void` | `undefined` |  |
| on-focus | `(e: FocusEvent) => void` | `undefined` |  |
| on-search | `(pattern: string, prefix: string) => void` | `undefined` |  |
| on-blur | `(e: FocusEvent) => void` | `undefined` |  |

### MentionOption Properties

| 名称     | 类型                                    | 说明                 |
| -------- | --------------------------------------- | -------------------- |
| class    | `string`                                |                      |
| disabled | `boolean`                               |                      |
| label    | `string`                                |                      |
| render   | `(option: MentionOption) => VNodeChild` |                      |
| style    | `string`                                |                      |
| value    | `string`                                | 在选项中应该是唯一的 |
