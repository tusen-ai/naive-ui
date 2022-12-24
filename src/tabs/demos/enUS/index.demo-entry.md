# Tabs

Switch contents in same area.

<n-alert type="warning" title="Note" :bordered="false">
  <n-text code>n-tabs</n-text> will extract default tab value from default slot, so there would be a vue slot warning. If you don't want to see the warning, you should give component a  <n-text code>default-value</n-text>.
</n-alert>

## Demos

```demo
basic.vue
segment.vue
card.vue
flex-label.vue
prefix.vue
size.vue
display-directive.vue
addable.vue
before-leave.vue
no-pane.vue
update-bar-manually.vue
bar-width.vue
trigger.vue
position-debug.vue
```

## API

### Tabs Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| addable | `boolean \| { disabled?: boolean }` | `false` | Whether to allow add tag. Only works when the tag's `type` is `card`. |  |
| animated | `boolean` | `false` | Whether to activate tab switching animation. | 2.27.0 |
| bar-width | `number` | `undefined` | The width of the tab bar. | 2.25.0 |
| closable | `boolean` | `false` | Whether to allow the tag to be closed. Only works when the tag's `type` is `card`. |  |
| default-value | `string \| number` | `undefined` | Default value in uncontrolled mode. |  |
| justify-content | `'space-between' \| 'space-around' \| 'space-evenly' \| 'start' \| 'center' \| 'end'` | `undefined` | Justify-content value of `flex` layout. Only works with `'line'` or `'bar'` typed tabs. | `space-*` 2.29.1 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of tabs. |  |
| pane-class | `string` | `undefined` | Class of the pane. |  |
| pane-style | `string \| object` | `undefined` | Style of the pane. |  |
| tab-style | `string \| object` | `undefined` | Style of the tab. |  |
| tabs-padding | `number` | `0` | Left & right `padding` of the group of tabs. |  |
| trigger | `'click' \| 'hover'` | `'click'` | Trigger of activating a tab | 2.27.0 |
| type | `'bar' \| 'line' \| 'card' \| 'segment'` | `'bar'` | Tabs type. |  |
| value | `string \| number` | `undefined` | Value in controlled mode. |  |
| on-add | `() => void` | `undefined` | Callback function triggered when add tag. |  |
| on-before-leave | `(activeName: string \| number, oldActiveName: string \| number \| null) => boolean \| Promise<boolean>` | `undefined` | Hook function before switching tab. Returning `false` or promise resolving `false` or promise rejection will prevent tab switching. |  |
| on-close | `(name: string \| number) => void` | `undefined` | Callback function triggered when close tag. |  |
| on-update:value | `(value: string \| number) => void` | `undefined` | Callback function triggered when the value changes. |  |

### TabPane Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| closable | `boolean` | `false` | Whether to allow the tag to be closed. Only works when the tag's `type` is `card`. |  |
| disabled | `boolean` | `false` | Whether to disable the tabs. |  |
| display-directive | `'if' \| 'show' \| 'show:lazy'` | `'if'` | The directive to use in conditionally rendering. `if` will use `v-if` and `show` will use `v-show`. When use `show` directive, the status of tab won't be reset after tab changes. When use `show:lazy`, the display effect is the same as `show`, but the content will be lazily loaded. |  |
| name | `string \| number` | `undefined` | Required, the name of the tab. |  |
| tab | `string \| VNode \| () => VNodeChild` | `undefined` | Tab label. |  |
| tab-props | `Object` | `undefined` | DOM attributes of tab label. | 2.24.2 |

### Tab Props

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

### Tabs Methods

| Name            | Type         | Description              | Version |
| --------------- | ------------ | ------------------------ | ------- |
| syncBarPosition | `() => void` | Sync tab bar's position. | 2.24.0  |
