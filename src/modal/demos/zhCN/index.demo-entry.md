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
transform-origin
a11y-debug
raw-debug
dark-1-debug
dark-2-debug
dark-3-debug
dark-4-debug
dark-5-debug
drawer-debug
dark-6-debug
dark-7-debug
dark-8-debug
dark-9-debug
dark-10-debug
```

## API

### Modal Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| display-directive | `'if' \| 'show'` | `'if'` | 使用何种指令控制模态框主体的条件渲染 |
| mask-closable | `boolean` | `true` | 点击遮罩时是否发出 `update:show` 事件 |
| preset | `'dialog' \| 'card'` | `undefined` | 模态框使用何种预设 |
| show | `boolean` | `false` | 是否展示 Modal |
| to | `string \| HTMLElement` | `body` | Modal 的挂载位置 |
| transform-origin | `'mouse' \| 'center'` | `'mouse'` | 模态框动画出现的位置 |
| on-update:show | `(value: boolean) => void` | `undefined` | 模态框更新是否展示状态的回调 |
| on-after-enter | `() => void` | `undefined` | Modal 出现后的回调 |
| on-after-leave | `() => void` | `undefined` | Modal 关闭后的回调 |

### Modal（Card 预设）Props

参考 [Card props](card#Card-Props)

### Modal（Dialog 预设）Props

参考 [Dialog props](dialog#Dialog-Props)

### Modal（无预设）Slots

| 名称    | 参数 | 说明         |
| ------- | ---- | ------------ |
| default | `()` | 模态框的内容 |

### Modal（Card 预设）Slots

参考 [Card slots](card#Card-Slots)

### Modal（Dialog 预设）Slots

参考 [Dialog slots](dialog#Dialog-Slots)
