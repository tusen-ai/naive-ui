# 引导 Guide

逐步引导用户了解功能。

## 演示

```demo
basic.vue
controlled.vue
placement.vue
target-gap.vue
custom-action.vue
no-mask.vue
no-target.vue
```

## API

### Guide Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| animated | `boolean` | `true` | 是否启用过渡动画。 |  |
| block-scroll | `boolean` | `true` | 显示引导时是否锁定页面滚动。 |  |
| close-on-esc | `boolean` | `true` | 是否允许按 Esc 关闭引导。 |  |
| current | `number` | `undefined` | 当前步骤，从 1 开始。 |  |
| default-current | `number` | `1` | 非受控模式下默认的当前步骤。 |  |
| default-show | `boolean` | `false` | 非受控模式下是否默认显示。 |  |
| finish-button-props | `ButtonProps` | `undefined` | 完成按钮的属性。 |  |
| finish-text | `string \| null` | `'完成'` | 完成按钮文字，设为 `null` 时隐藏。 |  |
| mask-closable | `boolean` | `true` | 是否允许点击遮罩关闭引导。 |  |
| next-button-props | `ButtonProps` | `undefined` | 下一步按钮的属性。 |  |
| next-text | `string \| null` | `'下一步'` | 下一步按钮文字，设为 `null` 时隐藏。 |  |
| placement | `PopoverPlacement` | `'bottom'` | 默认面板位置。 |  |
| prev-button-props | `ButtonProps` | `undefined` | 上一步按钮的属性。 |  |
| prev-text | `string \| null` | `'上一步'` | 上一步按钮文字，设为 `null` 时隐藏。 |  |
| scroll-into-view | `boolean` | `true` | 切换步骤时是否滚动目标进入视口。 |  |
| show | `boolean` | `undefined` | 是否显示引导。 |  |
| show-mask | `boolean` | `true` | 是否显示遮罩。 |  |
| skip-button-props | `ButtonProps` | `undefined` | 跳过按钮的属性。 |  |
| skip-text | `string \| null` | `'跳过'` | 跳过按钮文字，设为 `null` 时隐藏。 |  |
| steps | `GuideStep[]` | `[]` | 引导步骤。 |  |
| target-border-radius | `number` | `4` | 高亮目标区域的圆角。 |  |
| target-gap | `number` | `0` | 高亮框与目标框之间的间距。 |  |
| to | `string \| HTMLElement \| false` | `'body'` | 引导挂载的容器节点，`false` 会留在当前位置。 |  |
| z-index | `number` | `undefined` | 引导的 z-index。 |  |
| on-close | `() => void` | `undefined` | 引导关闭时的回调。 |  |
| on-finish | `(current: number) => void` | `undefined` | 完成引导时的回调。 |  |
| on-next | `(current: number) => void` | `undefined` | 进入下一步时的回调。 |  |
| on-prev | `(current: number) => void` | `undefined` | 返回上一步时的回调。 |  |
| on-update:current | `(current: number) => void` | `undefined` | 当前步骤变化时的回调。 |  |
| on-update:show | `(show: boolean) => void` | `undefined` | 显示状态变化时的回调。 |  |

### GuideStep 属性

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| content | `string \| (() => VNodeChild)` | `undefined` | 步骤内容。 |
| placement | `PopoverPlacement` | `undefined` | 当前步骤的面板位置。 |
| showArrow | `boolean` | `true` | 当前步骤是否显示箭头。 |
| target | `string \| HTMLElement \| (() => HTMLElement \| null)` | `undefined` | 目标元素。 |
| title | `string` | `undefined` | 步骤标题。 |

### Guide Slots

| 名称      | 参数                       | 说明             |
| --------- | -------------------------- | ---------------- |
| actions   | `{ step, current, total }` | 自定义操作区。   |
| default   | `{ step, current, total }` | 自定义主体内容。 |
| indicator | `{ step, current, total }` | 自定义指示器。   |
| title     | `{ step, current, total }` | 自定义标题。     |

### Guide Methods

| 名称         | 参数 | 说明                       |
| ------------ | ---- | -------------------------- |
| close        | `()` | 关闭引导。                 |
| finish       | `()` | 完成并关闭引导。           |
| next         | `()` | 进入下一步。               |
| prev         | `()` | 返回上一步。               |
| syncPosition | `()` | 同步面板和高亮目标的位置。 |
