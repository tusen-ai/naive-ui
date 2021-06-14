# 折叠面板 Collapse

我看到它总被用在界面边栏的控制面板上。

## 演示

```demo
basic
arrow-placement
accordion
nested
display-directive
item-header-click
customize-icon
```

## Props

### Collapse Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| accordion | `boolean` | `false` | 是否设置手风琴样式 |
| arrow-placement | `'left' \| 'right'` | `'left'` | 箭头位置 |
| default-expanded-names | `string \| number \| Array<string \| number> \| null` | `null` | `accordion` 模式时不为数组 |
| display-directive | `'if' \| 'show'` | `'if'` | 内部 `n-collapse-item` 在控制内容是否渲染时使用的指令，`'if'` 对应 `v-if`，`'show'` 对应 `v-show` |
| expanded-names | `string \| number \| Array<string \| number> \| null` | `undefined` | `accordion` 模式时不为数组 |
| on-update:expanded-names | `(expandedNames: Array<string \| number> \| string \| number \| null) => void` | `undefined` | expanded-names 改变时触发的回调函数 |
| on-item-header-click | `(data: { name: string \| number, expanded: boolean, event: MouseEvent }) => void` | `undefined` | 点击标题时触发的回调函数 |

### Collapse Item Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| display-directive | `'if' \| 'show'` | `undefined` | 自身在控制内容是否渲染时使用的指令，`'if'` 对应 `v-if`，`'show'` 对应 `v-show`。在设定为 `undefined` 的时候跟随外层的 `n-collapse` |
| name | `string \| number` | 随机字符串 | name 值，对于选中时有用 |
| title | `string` | `undefined` | 标题 |

## Slots

### Collapse Slots

| 名称    | 参数                                | 说明                    |
| ------- | ----------------------------------- | ----------------------- |
| default | `()`                                | Collapse 默认填充的内容 |
| arrow   | `(options: { collapsed: boolean })` | Collapse 自定义图标     |

### Collapse Item Slots

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | `()` | Collapse Item 默认填充的内容 |
| header | `()` | Collapse Item 的 header 部分填充的内容 |
| arrow | `(options: { collapsed: boolean })` | Collapse Item 自定义图标 |
