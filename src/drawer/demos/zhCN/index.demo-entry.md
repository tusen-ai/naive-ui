# 抽屉 Drawer

我感觉和 Modal 功能差不太多，位置有点差别。

<n-alert title="提示" type="warning" :bordered="false">
  如果你需要使用 <n-text code>n-drawer-content</n-text>，<n-text code>n-drawer</n-text> 的 <n-text code>native-scrollbar</n-text> 需要保持为 <n-text code>true</n-text>。
</n-alert>

## 演示

```demo
basic.vue
multiple.vue
closable.vue
target.vue
slot.vue
scroll.vue
a11y-debug.vue
custom-style-debug.vue
dark-1-debug.vue
dark-2-debug.vue
dark-3-debug.vue
dark-4-debug.vue
resizable.vue
rtl-debug.vue
```

## API

### Drawer Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| auto-focus | `boolean` | `true` | 是否自动聚焦 Drawer 第一个可聚焦的元素 | 2.24.2 |
| block-scroll | `boolean` | `true` | 是否在打开时禁用 body 滚动 | 2.28.3 |
| close-on-esc | `boolean` | `true` | 是否在摁下 Esc 键的时候关闭 Drawer | 2.24.2 |
| content-style | `string \| Object` | `undefined` | 抽屉可滚动内容节点的样式 |  |
| default-width | `number \| string` | `251` | 抽屉的默认宽度，在位置是 `left` 和 `right` 时生效 | 2.31.0 |
| default-height | `number \| string` | `251` | 抽屉的默认高度，在位置是 `top` 和 `bottom` 时生效 | 2.31.0 |
| display-directive | `'if' \| 'show'` | `'if'` | `n-drawer` 在控制内容是否渲染时使用的指令，`'if'` 对应 `v-if`，`'show'` 对应 `v-show` |  |
| height | `number \| string` | `undefined` | 抽屉的高度，在位置是 `top` 和 `bottom` 时生效 |  |
| mask-closable | `boolean` | `true` | 点击遮罩时是否发出 `update:show` 事件 |  |
| native-scrollbar | `boolean` | `true` | 是否使用原生滚动 |  |
| placement | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | 抽屉展示的位置 |  |
| resizable | `boolean` | `false` | 抽屉是否可以调整宽度、高度 | 2.31.0 |
| show | `boolean` | `false` | 是否展示抽屉 |  |
| show-mask | `boolean \| 'transparent'` | `true` | 是否显示遮罩，如果设为 `'transparent'` 会展示透明遮罩，如果设为 `false` 会禁用 `trap-focus` | 2.28.3 |
| style | `string \| Object` | `undefined` | 抽屉的样式 |  |
| to | `string \| HTMLElement` | `'body'` | 抽屉出现的区域 |  |
| trap-focus | `boolean` | `true` | 是否将焦点锁定在 Drawer 内部 | 2.24.2 |
| width | `number \| string` | `undefined` | 抽屉的宽度，在位置是 `left` 和 `right` 时生效 |  |
| z-index | `number` | `undefined` | 抽屉的 z-index | 2.24.0 |
| on-after-enter | `() => void` | `undefined` | Drawer 出现后的回调 | 2.28.0 |
| on-after-leave | `() => void` | `undefined` | Drawer 关闭后的回调 | 2.28.0 |
| on-esc | `() => void` | `undefined` | 焦点在 Drawer 内部时按下 Esc 键的回调 | 2.24.2 |
| on-mask-click | `(e: MouseEvent) => void` | `undefined` | 点击遮罩的回调 |  |
| on-update:height | `(height: number) => void` | `undefined` | 抽屉高度改变时执行的回调函数 | 2.31.0 |
| on-update:show | `(show: boolean) => void` | `undefined` | 抽屉显示状态改变时执行的回调函数 |  |
| on-update:width | `(width: number) => void` | `undefined` | 抽屉宽度改变时执行的回调函数 | 2.31.0 |

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
