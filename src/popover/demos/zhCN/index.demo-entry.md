# 弹出信息 Popover

Popover 在内容周围弹出一些隐藏的信息。Popover 里面没什么内置样式，在里面填什么主要靠你了。

如果你只想展示一些基本的文本内容，使用 [Tooltip](tooltip)。

## 演示

```demo
basic
trigger
delay
no-arrow
event
placement
raw-content
style
trigger-width
manual-position
hoist-debug
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| animated | `boolean` | `true` |  |
| arrow-style | `Object` | `undefined` |  |
| delay | `number` | `100` | 悬浮触发弹出信息的延迟 |
| disabled | `boolean` | `false` | 是否不能激活弹出信息 |
| display-directive | `'if' \| 'show'` | `'if'` | 条件渲染使用的指令，`if` 会让内容被使用 `v-if` 渲染，`show` 会让内容被使用 `v-show` 渲染 |
| duration | `number` | `100` | 悬浮关闭弹出信息的延迟 |
| filp | `boolean` | `true` | 是否在当前放置方式不能提供足够空间的时候调整弹出信息的位置 |
| overlap | `boolean` | `false` |  |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end' \| ` | `'top'` |  |
| raw | `boolean` | `false` | 是否不添加默认样式 |
| show-arrow | `boolean` | `true` |  |
| show | `boolean` | `undefined` | 是否展示 popover |
| trigger | `'hover' \| 'click' \| 'manual'` | `'hover'` |  |
| width | `number \| 'trigger'` | `undefined` | `'trigger'` 表示 popover 的宽度会和它的触发元素一致 |
| x | `number` | `undefined` | 手动控制位置时填出内容的 CSS `left` 的像素值 |
| y | `number` | `undefined` | 手动控制位置时填出内容的 CSS `top` 的像素值 |
| on-update:show | `(value: boolean) => void` |  |  |

## Slots

| 名称    | 参数 | 说明                     |
| ------- | ---- | ------------------------ |
| trigger | `()` | 触发弹出信息的组件或元素 |
| default | `()` | 弹出的内容               |

## Methods

| 名称         | 参数              | 说明                             |
| ------------ | ----------------- | -------------------------------- |
| setShow      | `(show: boolean)` | 非受控模式下控制是否显示 popover |
| syncPosition | `()`              | 同步 popover 位置                |
