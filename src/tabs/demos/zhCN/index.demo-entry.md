# 标签页 Tabs

在同一块区域切换内容。

## 演示

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
line-debug
style-inherit-debug
shadow-debug
unkeyed-debug
```

## API

### Tabs Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| addable | `boolean \| { disabled?: boolean }` | `false` | 是否允许添加标签，只在标签的 `type` 为 `card` 时生效 |
| closable | `boolean` | `false` | 是否允许关闭标签，只在标签的 `type` 为 `card` 时生效 |
| default-value | `string \| number` | `undefined` | 非受控模式下的默认值 |
| justify-content | `'space-between' \| 'space-around' \| 'space-evenly'` | `undefined` | `flex` 布局下主轴的排列方式 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 标签页的尺寸 |
| pane-class | `string` | `undefined` | 面板的类名 |
| pane-style | `string \| object` | `undefined` | 面板的样式 |
| tab-style | `string \| object` | `undefined` | 标签的样式 |
| tabs-padding | `number` | `0` | 全部标签最左和最右的 `padding` |
| type | `'bar' \| 'line' \| 'card' \| 'segment'` | `'bar'` | 标签类型 |
| value | `string \| number` | `undefined` | 受控模式下的值 |
| on-add | `() => void` | `undefined` | 添加标签的回调函数 |
| on-before-leave | `(name: string \| number, oldName: string \| number \| null) => boolean \| Promise<boolean>` | `undefined` | 切换标签之前的钩子函数，返回 `false` 或 promise resolve `false` 或 promise reject 会阻止切换 |
| on-close | `(name: string \| number) => void` | `undefined` | 关闭标签的回调函数 |
| on-update:value | `(value: string \| number) => void` | `undefined` | 选中发生改变时的回调函数 |

### TabPane Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| closable | `boolean` | `false` | 是否允许关闭标签，只在标签的 `type` 为 `card` 时生效 |
| disabled | `boolean` | `false` | 是否禁用 |
| display-directive | `'if' \| 'show' \| 'show:lazy'` | `'if'` | 选择性渲染使用的指令，`if` 对应 `v-if`，`show` 对应 `v-show`，使用 `show` 的时候标签页状态切换后不会被重置，使用 `show:lazy` 的时候显示效果跟 `show` 一致，不过内容会进行延迟加载 |
| tab | `string \| VNode \| () => VNodeChild` | `undefined` | 标签的 `tab` |
| name | `string \| number` | `undefined` | 必填，标签的名称 |

### Tab Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| closable | `boolean` | `false` | 是否允许关闭标签，只在标签的 `type` 为 `card` 时生效 |
| disabled | `boolean` | `false` | 是否禁用 |
| name | `string \| number` | `undefined` | 必填，标签的名称 |

### Tabs Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | `()` | 标签的内容 |
| prefix  | `()` | 标签的前缀 |
| suffix  | `()` | 标签的后缀 |

### TabPane Slots

| 名称    | 参数 | 说明                |
| ------- | ---- | ------------------- |
| default | `()` | 标签项的内容        |
| tab     | `()` | 标签项 `tab` 的内容 |

### Tab Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | `()` | tab 的内容 |
