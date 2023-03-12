# 弹出信息 Popover

Popover 在内容周围弹出一些隐藏的信息。Popover 里面没什么内置样式，在里面填什么主要靠你了。

如果你只想展示一些基本的文本内容，使用 [Tooltip](tooltip)。

## 演示

```demo
basic.vue
trigger.vue
delay.vue
no-arrow.vue
event.vue
placement.vue
raw-content.vue
style.vue
trigger-width.vue
manual-position.vue
slots.vue
width-debug.vue
hoist-debug.vue
nested-debug.vue
nested2-debug.vue
nested3-debug.vue
zindex-debug.vue
center-arrow-debug.vue
```

## API

### Popover Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| animated | `boolean` | `true` | 弹出弹窗时使用动画 |  |
| arrow-style | `Object` | `undefined` | popover 的箭头样式 |  |
| arrow-point-to-center | `boolean` | `false` | 箭头是否指向触发元素中心 | 2.26.0 |
| content-style | `Object \| string` | `undefined` | popover 内容的样式 | 2.28.3 |
| delay | `number` | `100` | 悬浮触发弹出信息的延迟 |  |
| disabled | `boolean` | `false` | 是否不能激活弹出信息 |  |
| display-directive | `'if' \| 'show'` | `'if'` | 条件渲染使用的指令，`if` 会让内容被使用 `v-if` 渲染，`show` 会让内容被使用 `v-show` 渲染 |  |
| duration | `number` | `100` | 悬浮关闭弹出信息的延迟 |  |
| flip | `boolean` | `true` | 是否在当前放置方式不能提供足够空间的时候调整弹出信息的位置 |  |
| footer-style | `Object \| string` | `undefined` | popover footer 的样式 | 2.31.0 |
| header-style | `Object \| string` | `undefined` | popover header 的样式 | 2.28.3 |
| keep-alive-on-hover | `boolean` | `true` | 是否在 trigger 为 hover 的时候，悬浮在 popover 时保持 popover 显示 | 2.25.0 |
| overlap | `boolean` | `false` | 覆盖触发元素 |  |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end' \| ` | `'top'` | popover 的弹出位置 |  |
| raw | `boolean` | `false` | 是否不添加默认样式 |  |
| scrollable | `boolean` | `false` | popover 内容是否可滚动 | 2.28.3 |
| show-arrow | `boolean` | `true` | 是否显示箭头 |  |
| show | `boolean` | `undefined` | 是否展示 popover |  |
| title | `string` | `undefined` | popover 的 title 信息 |  |
| to | `string \| HTMLElement \| false` | `'body'` | 弹出内容的目标容器位置，`false` 会待在原地 |  |
| trigger | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` | popover 的触发方式 |  |
| width | `number \| 'trigger'` | `undefined` | `'trigger'` 表示 popover 的宽度会和它的触发元素一致 |  |
| x | `number` | `undefined` | 手动控制位置时弹出内容的 CSS `left` 的像素值（x，y 都设置才能生效） |  |
| y | `number` | `undefined` | 手动控制位置时弹出内容的 CSS `top` 的像素值（x，y 都设置才能生效） |  |
| z-index | `number` | `undefined` | Popover 的 z-index |  |
| on-clickoutside | `(e: MouseEvent) => void` | `undefined` | clickoutside 时触发的回调函数 |  |
| on-update:show | `(value: boolean) => void` | `undefined` | 显示状态改变的回调函数 |  |

### Popover Slots

| 名称    | 参数 | 说明                     | 版本   |
| ------- | ---- | ------------------------ | ------ |
| trigger | `()` | 触发弹出信息的组件或元素 |        |
| footer  | `()` | 弹出的 footer 内容       | 2.31.0 |
| header  | `()` | 弹出的 header 内容       |        |
| default | `()` | 弹出的内容               |        |

### Popover Methods

| 名称         | 参数              | 说明                             |
| ------------ | ----------------- | -------------------------------- |
| setShow      | `(show: boolean)` | 非受控模式下控制是否显示 popover |
| syncPosition | `()`              | 同步 popover 位置                |
