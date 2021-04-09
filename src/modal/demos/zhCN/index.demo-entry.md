# 模态框 Modal

它会弹出来，然后给你看点东西。

## 演示

```demo
basic
controlled
mask-closable
custom-position
preset-card
preset-confirm
preset-confirm-slot
dark-1-debug
dark-2-debug
dark-3-debug
dark-4-debug
dark-5-debug
drawer-debug
dark-6-debug
dark-7-debug
```

## Props

### Modal

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| display-directive | `'if' \| 'show'` | `'if'` | 使用何种指令控制模态框主体的条件渲染 |
| mask-closable | `boolean` | `true` | 点击遮罩时是否发出 `update:show` 事件 |
| preset | `'card' \| 'dialog'` | `undefined` | 模态框使用何种预设 |
| show | `boolean` | `false` | 是否展示 Modal |
| show-mask | `boolean` | `true` | 是否展示 Modal 的遮罩 |
| on-update:show | `(value: boolean) => void` | `undefined` | 模态框更新是否展示状态的回调 |

### Modal（Card 预设）

参考 [Card props](n-card#Props)

### Modal（Dialog 预设）

参考 [Dialog props](n-dialog#Props)

## Slots

### Modal（无预设）

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |

### Modal（Card 预设）

参考 [Card slots](n-card#Slots)

### Modal（Dialog 预设）

参考 [Dialog slots](n-dialog#Slots)
