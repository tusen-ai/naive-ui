# 抽屉 Drawer

我感觉和 Modal 功能差不太多，位置有点差别。

## 演示

```demo
basic
multiple
target
custom-style-debug
dark-1-debug
dark-2-debug
dark-3-debug
dark-4-debug
```

## Props

### Drawer Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| content-style | `string \| Object` | `undefined` | 抽屉可滚动内容节点的样式 |
| height | `number \| string` | `251` | 在位置是 `top` 和 `bottom` 时生效 |
| mask-closable | `boolean` | `true` | 点击遮罩时是否发出 `update:show` 事件 |
| native-scrollbar | `boolean` | `true` |  |
| placement | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |  |
| show | `boolean` | `false` |  |
| style | `string \| Object` | `undefined` | 抽屉的样式 |
| to | `string \| HTMLElement` | `'body'` | 抽屉出现的区域 |
| width | `number \| string` | `251` |  |
| on-update:show | `(show: boolean) => void` | `undefined` |  |

### DrawerContent Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| body-style | `string \| Object` | `undefined` | 主体的样式 |
| footer-style | `string \| Object` | `undefined` |  |
| header-style | `string \| Object` | `undefined` |  |
| native-scrollbar | `boolean` | `true` | 主体部分是否使用原生滚动条 |
| title | `string` | `undefined` |  |

## Slots

### Drawer Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |

### DrawerContent Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |
| header  | `()` |      |
| footer  | `()` |      |
