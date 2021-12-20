# 抽屉 Drawer

我感觉和 Modal 功能差不太多，位置有点差别。

## 演示

```demo
basic
multiple
target
closable
slot
custom-style-debug
dark-1-debug
dark-2-debug
dark-3-debug
dark-4-debug
```

## API

### Drawer Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| content-style | `string \| Object` | `undefined` | 抽屉可滚动内容节点的样式 |
| display-directive | `'if' \| 'show'` | `'if'` | `n-drawer` 在控制内容是否渲染时使用的指令，`'if'` 对应 `v-if`，`'show'` 对应 `v-show` |
| height | `number \| string` | `251` | 抽屉的高度，在位置是 `top` 和 `bottom` 时生效 |
| mask-closable | `boolean` | `true` | 点击遮罩时是否发出 `update:show` 事件 |
| native-scrollbar | `boolean` | `true` | 是否使用原生滚动 |
| placement | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | 抽屉展示的位置 |
| show | `boolean` | `false` | 是否展示抽屉 |
| style | `string \| Object` | `undefined` | 抽屉的样式 |
| to | `string \| HTMLElement` | `'body'` | 抽屉出现的区域 |
| width | `number \| string` | `251` | 抽屉的宽度，在位置是 `left` 和 `right` 时生效 |
| on-mask-click | `(e: MouseEvent) => void` | `undefined` | 点击遮罩的回调 |
| on-update:show | `(show: boolean) => void` | `undefined` | 抽屉显示状态改变时执行的回调函数 |

### DrawerContent Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| body-style | `string \| Object` | `undefined` | 主体 body 的样式 |
| body-content-style | `string \| Object` | `undefined` | 主体可滚动内容节点的样式 |
| closable | `boolean` | `false` | 是否可关闭 |
| footer-style | `string \| Object` | `undefined` | 主体 footer 的样式 |
| header-style | `string \| Object` | `undefined` | 主体 header 的样式 |
| native-scrollbar | `boolean` | `true` | 主体部分是否使用原生滚动条 |
| title | `string` | `undefined` | 主体的标题 |

### Drawer Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | `()` | 抽屉的内容 |

### DrawerContent Slots

| 名称    | 参数 | 说明                     |
| ------- | ---- | ------------------------ |
| default | `()` | 抽屉主体的内容           |
| footer  | `()` | 抽屉主体 footer 的内容   |
| header  | `()` | 抽屉主体 header 的内容　 |
