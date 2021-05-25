# 标签页 Tabs

在同一块区域切换内容。

## 演示

```demo
basic
flex-label
card
prefix
display-directive
addable
line-debug
```

## Props

### Tabs Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| addable | `boolean \| { disabled?: boolean }` | `false` | 是否展示增加按钮，只在 type 为 `'card'` 时生效 |
| closable | `boolean` | `false` | 是否允许 tab 关闭，只在 type 为 `'card'` 时生效 |
| default-value | `string \| number` | 第一个标签页的 name 属性 |  |
| justify-content | `'space-between' \| 'space-around' \| 'space-evenly'` | `undefined` |  |
| label-size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | 标签的尺寸，只对线型的 Tabs 生效 |
| show-divider | `boolean` | `false` | 是否展示分割线，只在 type 为 `'line'` 时生效 |
| tab-style | `string \| object` | `undefined` | 标签的样式 |
| tabs-padding | `number` | `0` | 全部标签最左和最右的 padding |
| type | `'line' \| 'card'` | `'line'` |  |
| value | `string \| number` | `undefined` |  |
| on-add | `() => void` | `undefined` |  |
| on-close | `(name: string \| number) => void` | `undefined` |  |
| on-update:value | `(value: string \| number) => void` | `undefined` |  |

### Tab Pane Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| closable | `boolean` | `false` | 是否允许 tab 关闭，只在 tabs type 为 `'card'` 时生效 |
| disabled | `boolean` | `false` |  |
| display-directive | `'if' \| 'show'` | `'if'` | 选择性渲染使用的指令。if 对应 v-if，show 对应 v-show，使用 show 的时候标签页状态切换后不会被重置 |
| label | `string \| VNode \| () => VNodeChild` | `undefined` |  |
| name | `string \| number` | required |  |

## Slots

### Tabs

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |
| prefix  | `()` |      |
| suffux  | `()` |      |

### Tab Pane Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |
| label   | `()` |      |
