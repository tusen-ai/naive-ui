# Tabs

Switch contents in same area.

## Demos

```demo
basic
flex-label
card
size
prefix
display-directive
addable
line-debug
```

## Props

### Tabs Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| addable | `boolean \| { disabled?: boolean }` | `false` | Whether to allow add tag. Only works when the tag's `type` is `card`. |
| closable | `boolean` | `false` | Whether to allow the tag to be closed. Only works when the tag's `type` is `card`. |
| default-value | `string \| number` | `undefined` | Default value in uncontrolled mode. |
| justify-content | `'space-between' \| 'space-around' \| 'space-evenly'` | `undefined` | Justify-content value of `flex` layout. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of tabs. |
| pane-style | `string \| object` | `undefined` | Style of the pane. |
| tab-style | `string \| object` | `undefined` | Style of the tab. |
| tabs-padding | `number` | `0` | Left & right `padding` of the group of tabs. |
| type | `'bar' \| 'line' \| 'card'` | `'bar'` | Tabs type. |
| value | `string \| number` | `undefined` | Value in controlled mode. |
| on-add | `() => void` | `undefined` | Callback function triggered when add tag. |
| on-close | `(name: string \| number) => void` | `undefined` | Callback function triggered when close tag. |
| on-update:value | `(value: string \| number) => void` | `undefined` | Callback function triggered when the value changes. |

### Tab Pane Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| closable | `boolean` | `false` | Whether to allow the tag to be closed. Only works when the tag's `type` is `card`. |
| disabled | `boolean` | `false` | Whether to disable. |
| display-directive | `'if' \| 'show'` | `'if'` | The directive to use in conditionally rendering. `if` will use `v-if` and `show` will use `v-show`. When use show directive, the status of tab won't be reset after tab changes. |
| tab | `string \| VNode \| () => VNodeChild` | `undefined` | Tab label. |
| name | `string \| number` | `undefined` | Required, the name of the tab. |

## Slots

### Tabs Slots

| Name    | Parameters | Description   |
| ------- | ---------- | ------------- |
| default | `()`       | Tabs content. |
| prefix  | `()`       | Tabs prefix.  |
| suffix  | `()`       | Tabs suffix.  |

### Tab Pane Slots

| Name    | Parameters | Description        |
| ------- | ---------- | ------------------ |
| default | `()`       | Tab content.       |
| tab     | `()`       | Tab label content. |
