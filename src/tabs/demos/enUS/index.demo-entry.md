# Tabs

Switch contents in same area.

## Demos

```demo
basic
segment
card
flex-label
size
prefix
display-directive
addable
before-leave
no-pane
```

## API

### Tabs Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| addable | `boolean \| { disabled?: boolean }` | `false` | Whether to allow add tag. Only works when the tag's `type` is `card`. |
| closable | `boolean` | `false` | Whether to allow the tag to be closed. Only works when the tag's `type` is `card`. |
| default-value | `string \| number` | `undefined` | Default value in uncontrolled mode. |
| justify-content | `'space-between' \| 'space-around' \| 'space-evenly'` | `undefined` | Justify-content value of `flex` layout. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of tabs. |
| pane-class | `string` | `undefined` | Class of the pane. |
| pane-style | `string \| object` | `undefined` | Style of the pane. |
| tab-style | `string \| object` | `undefined` | Style of the tab. |
| tabs-padding | `number` | `0` | Left & right `padding` of the group of tabs. |
| type | `'bar' \| 'line' \| 'card' \| 'segment'` | `'bar'` | Tabs type. |
| value | `string \| number` | `undefined` | Value in controlled mode. |
| on-add | `() => void` | `undefined` | Callback function triggered when add tag. |
| on-before-leave | `(activeName: string \| number, oldActiveName: string \| number \| null) => boolean \| Promise<boolean>` | `undefined` | Hook function before switching tab. Returning `false` or promise resolving `false` or promise rejection will prevent tab switching. |
| on-close | `(name: string \| number) => void` | `undefined` | Callback function triggered when close tag. |
| on-update:value | `(value: string \| number) => void` | `undefined` | Callback function triggered when the value changes. |

### TabPane Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| closable | `boolean` | `false` | Whether to allow the tag to be closed. Only works when the tag's `type` is `card`. |
| disabled | `boolean` | `false` | Whether to disable. |
| display-directive | `'if' \| 'show'` \| 'show:lazy' | `'if'` | The directive to use in conditionally rendering. `if` will use `v-if` and `show` will use `v-show`. When use `show` directive, the status of tab won't be reset after tab changes. When use `show:lazy`, the display effect is the same as `show`, but the content will be lazily loaded. |
| tab | `string \| VNode \| () => VNodeChild` | `undefined` | Tab label. |
| name | `string \| number` | `undefined` | Required, the name of the tab. |

### TabPane Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| closable | `boolean` | `false` | Whether to allow the tag to be closed. Only works when the tag's `type` is `card`. |
| disabled | `boolean` | `false` | Whether to disable. |
| name | `string \| number` | `undefined` | Required, the name of the tab. |

### Tabs Slots

| Name    | Parameters | Description   |
| ------- | ---------- | ------------- |
| default | `()`       | Tabs content. |
| prefix  | `()`       | Tabs prefix.  |
| suffix  | `()`       | Tabs suffix.  |

### TabPane Slots

| Name    | Parameters | Description        |
| ------- | ---------- | ------------------ |
| default | `()`       | Tab pane content.  |
| tab     | `()`       | Tab label content. |

### Tab Slots

| Name    | Parameters | Description  |
| ------- | ---------- | ------------ |
| default | `()`       | Tab content. |
