# 面板分割 Split

灵活的布局工具，提供了用户自定义界面布局的可能性。

`2.36.0` 版本开始提供该组件。

## 演示

```demo
basic.vue
vertical.vue
nest.vue
event.vue
slot.vue
controlled.vue
pixel-value.vue
```

## API

### Split Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| default-size | `string \| number` | `0.5` | Split 的默认分割大小，为 `number` 类型时应该为 0 ~ 1 之间的值，为 `string` 类型时应该为 `${number}px` 格式 | 2.36.0, `string` 2.38.2 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Split 的分割方向 | 2.36.0 |
| disabled | `boolean` | `false` | 是否禁用 | 2.36.0 |
| max | `string \| number` | `1` | Split 的分割最大阈值，为 `number` 类型时应该为 0 ~ 1 之间的值，为 `string` 类型时应该为 `${number}px` 格式 | 2.36.0, `string` 2.38.2 |
| min | `string \| number` | `0` | Split 的分割最小阈值，为 `number` 类型时应该为 0 ~ 1 之间的值，为 `string` 类型时应该为 `${number}px` 格式 | 2.36.0, `string` 2.38.2 |
| pane1-class | `string` | `undefined` | 第一个面板的类名 | 2.38.2 |
| pane1-style | `Object \| string` | `undefined` | 第一个面板的样式 | 2.38.2 |
| pane2-class | `string` | `undefined` | 第二个面板的类名 | 2.38.2 |
| pane2-style | `Object \| string` | `undefined` | 第二个面板的样式 | 2.38.2 |
| resize-trigger-size | `number` | `3` | Split 的分隔条大小 | 2.36.0 |
| size | `string \| number` | `undefined` | Split 的受控分割大小，为 `number` 类型时应该为 0 ~ 1 之间的值，为 `string` 类型时应该为 `${number}px` 格式 | 2.38.0, `string` 2.38.2 |
| watch-props | `Array<'defaultSize'>` | `undefined` | 需要检测变更的默认属性，检测后组件状态会更新。注意：`watch-props` 本身不是响应式的 | 2.38.0 |
| on-drag-start | `(e: Event) => void` | `undefined` | 开始拖拽的回调函数 | 2.36.0 |
| on-drag-move | `(e: Event) => void` | `undefined` | 拖拽中的回调函数 | 2.36.0 |
| on-drag-end | `(e: Event) => void` | `undefined` | 结束拖拽的回调函数 | 2.36.0 |
| on-update:size | `(value: string \| number) => void` | `undefined` | 组件 `size` 属性变化时触发的回调，如果 `props.value` 或 `props.defaultValue` 是 `string`， 则 `value` 为 `string` | 2.38.0 |

### Split Slots

| 名称           | 参数 | 说明           | 版本   |
| -------------- | ---- | -------------- | ------ |
| 1              | `()` | 第一个面板内容 | 2.36.0 |
| 2              | `()` | 第二个面板内容 | 2.36.0 |
| resize-trigger | `()` | 分割条内容     | 2.36.0 |
