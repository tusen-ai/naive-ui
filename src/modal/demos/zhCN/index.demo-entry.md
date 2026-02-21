# 模态框 Modal

它会弹出来，然后给你看点东西。

<n-space vertical size="large">
<n-alert type="warning" title="提示" :bordered="false">
  <n-ul align-text>
    <li>
      如果你想通过 <n-text code>useModal</n-text> 使用模态框，你需要把调用其方法的组件放在 <n-text code>n-modal-provider</n-text> 内部并且使用 <n-text code>useModal</n-text> 去获取 API。
    </li>
    <li>
      如果你想知道如何在 <n-text code>setup</n-text> 外使用，请参考页面最下方的 Q & A。
    </li>
  </n-ul>
</n-alert>

例如：

```html
<!-- App.vue -->
<n-modal-provider>
  <content />
</n-modal-provider>
```

```js
import { useModal } from 'naive-ui'
import { defineComponent } from 'vue'

// content
export default defineComponent({
  setup() {
    const modal = useModal()
    return {
      showModal() {
        modal.create({
          title: '标题',
          content: '内容'
        })
      }
    }
  }
})
```

</n-space>

## 演示

```demo
basic.vue
reactive.vue
controlled.vue
mask-closable.vue
custom-position.vue
preset-card.vue
preset-confirm.vue
preset-confirm-slot.vue
transform-origin.vue
draggable.vue
show-mask.vue
nested-debug.vue
a11y-debug.vue
raw-debug.vue
dark-1-debug.vue
dark-2-debug.vue
dark-3-debug.vue
dark-4-debug.vue
dark-5-debug.vue
drawer-debug.vue
dark-6-debug.vue
dark-7-debug.vue
dark-8-debug.vue
dark-9-debug.vue
dark-10-debug.vue
mask-click-debug.vue
```

## API

### ModalProvider Props

自 `2.38.0` 开始提供。

| 名称 | 类型                    | 默认值 | 说明           | 版本   |
| ---- | ----------------------- | ------ | -------------- | ------ |
| to   | `string \| HTMLElement` | `body` | 模态的挂载位置 | 2.38.0 |

### useModal API

自 `2.38.0` 开始提供。

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| create | `(options: ModalOptions) => ModalReactive` | 创建模态框 | 2.38.0 |
| destroyAll | `() => void` | 销毁所有弹出的模态框 | 2.38.0 |

`ModalOptions` 的属性和 `ModalReactive` 属性同 `ModalProps`（属性应使用 camelCase，例如 `auto-focus` 对应 `autoFocus`）。

### Modal Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| auto-focus | `boolean` | `true` | 是否自动聚焦 Modal 第一个可聚焦的元素 | 2.24.2 |
| block-scroll | `boolean` | `true` | 是否在打开时禁用 body 滚动 | 2.28.3 |
| close-on-esc | `boolean` | `true` | 是否在摁下 Esc 键的时候关闭 Modal | 2.24.2 |
| display-directive | `'if' \| 'show'` | `'if'` | 使用何种指令控制模态框主体的条件渲染 |  |
| draggable | `boolean \| { bounds?: 'none' }` | `false` | 是否可拖拽，`bounds === 'none'` 时拖拽可超出视口 | 2.41.0 |
| mask-closable | `boolean` | `true` | 点击遮罩时是否发出 `update:show` 事件 |  |
| preset | `'dialog' \| 'card'` | `undefined` | 模态框使用何种预设 |  |
| show | `boolean` | `false` | 是否展示 Modal |  |
| show-mask | `boolean` | `true` | 是否显示遮罩层，如果设为 `false`，遮罩层相关的 API 将不起作用，焦点也不会被限制在 Modal 内部（这会导致键盘事件例如 Esc 不总是生效）。 | 2.43.0 |
| to | `string \| HTMLElement` | `body` | Modal 的挂载位置 |  |
| transform-origin | `'mouse' \| 'center'` | `'mouse'` | 模态框动画出现的位置 |  |
| trap-focus | `boolean` | `true` | 是否将焦点锁定在 Modal 内部 | 2.24.2 |
| z-index | `number` | `undefined` | Modal 的 z-index | 2.24.0 |
| on-after-enter | `() => void` | `undefined` | Modal 出现后的回调 |  |
| on-after-leave | `() => void` | `undefined` | Modal 关闭后的回调 |  |
| on-esc | `() => void` | `undefined` | 焦点在 Modal 内部时按下 Esc 键的回调 | 2.24.2 |
| on-mask-click | `() => void` | `undefined` | 点击遮罩时的回调 |  |
| on-update:show | `(value: boolean) => void` | `undefined` | 模态框更新是否展示状态的回调 |  |

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

注意，`default` slot 参数类型为 `(props: { draggableClass: string })`

### Modal（Dialog 预设）Slots

参考 [Dialog slots](dialog#Dialog-Slots)

注意，`default` slot 参数类型为 `(props: { draggableClass: string })`

## Q & A

### 在 setup 外使用

#### 选择 1

使用 [createDiscreteApi](discrete)。如果你想使用它，请认真阅读它的注意事项。你最好不要把它和 `useModal` 在同一 App 中混用。

#### 选择 2

<n-space vertical size="large">
<n-alert type="warning" :bordered="false">
  如果你想在 setup 外使用模态框，你需要在顶层 setup 中把 <n-text code>useModal</n-text> 返回的 modal 值挂载到 window 下然后再调用，调用前需要确保 modal 已经挂载成功。
</n-alert>

```html
<!-- App.vue -->
<n-modal-provider>
  <content />
</n-modal-provider>
```

```html
<!-- content.vue -->
<template>...</template>

<script>
  import { useModal } from 'naive-ui'
  import { defineComponent } from 'vue'

  // content
  export default defineComponent({
    setup() {
      window.$modal = useModal()
    }
  })
</script>
```

```js
// xxx.js
export function handler() {
  // 需要确保已经在 setup 中执行了 window.$modal = modal
  window.$modal.create({
    title: '标题',
    content: '内容'
  })
}
```

</n-space>
