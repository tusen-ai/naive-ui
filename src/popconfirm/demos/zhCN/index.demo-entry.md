# 弹出确认 Popconfirm

一个确认，弹出来的。

## 演示

```demo
basic.vue
custom-action.vue
custom-icon.vue
event.vue
no-icon.vue
actions.vue
```

## API

### Popconfirm Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| negative-button-props | `ButtonProps` | `undefined` | 取消按钮的属性 | 2.27.0 |
| negative-text | `string \| null` | `'取消'` | 取消按钮文字 | 2.28.0 |
| positive-button-props | `ButtonProps` | `undefined` | 确定按钮的属性 | 2.27.0 |
| positive-text | `string \| null` | `'确认'` | 确定按钮文字 | 2.28.0 |
| show-icon | `boolean` | `true` | 是否显示图标 |  |
| on-positive-click | `() => boolean \| Promise<boolean> \| any` | `undefined` | 点击确定的回调函数 |  |
| on-negative-click | `() => boolean \| Promise<boolean> \| any` | `undefined` | 点击取消的回调函数 |  |

更多 props 请参考 [popover](popover#Popover-Props).

### Popconfirm Slots

| 名称    | 参数 | 说明           |
| ------- | ---- | -------------- |
| action  | `()` | 自定义操作     |
| default | `()` | 弹出确认的内容 |
| icon    | `()` | 弹出确认的图标 |

### Popconfirm Methods

See [popover](popover#Popover-Methods)
