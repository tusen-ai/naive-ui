# 对话框 Dialog

执行之前，请确认。

<n-alert title="使用前提" type="warning" :bordered="false">
  如果你想使用对话框，你需要把调用其方法的组件放在 <n-text code>n-dialog-provider</n-text> 内部并且使用 <n-text code>useDialog</n-text> 去获取 API。
</n-alert>

例如：

```html
<!-- App.vue -->
<n-dialog-provider>
  <content />
</n-dialog-provider>
```

```js
import { defineComponent } from 'vue'
import { useDialog } from 'naive-ui'

// content
export default defineComponent({
  setup () {
    const dialog = useDialog()
    return {
      warning () {
        dialog.warning(options)
      }
    }
  }
})
```

## 演示

```demo
basic.vue
async.vue
use-component.vue
mask.vue
action.vue
use-dialog-reactive-list.vue
focus-debug.vue
```

## API

### useDialog API

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| destroyAll | `() => void` | 销毁所有弹出的对话框 |
| create | `(options: DialogOptions) => DialogReactive` | 创建对话框 |
| error | `(options: DialogOptions) => DialogReactive` | 调用 `error` 类型的对话框 |
| info | `(options: DialogOptions) => DialogReactive` | 调用 `info` 类型的对话框 |
| success | `(options: DialogOptions) => DialogReactive` | 调用 `success` 类型的对话框 |
| warning | `(options: DialogOptions) => DialogReactive` | 调用 `warning` 类型的对话框 |

### useDialogReactiveList API

`() => Ref<readonly DialogReactive[]>`

### DialogOptions Properties

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| action | `() => VNodeChild` | `undefined` | 操作区域的内容，需要是 `render` 函数 |  |
| autoFocus | `boolean` | `true` | 是否自动聚焦 Modal 第一个可聚焦的元素 | 2.28.3 |
| blockScroll | `boolean` | `true` | 是否在打开时禁用 body 滚动 | 2.28.3 |
| bordered | `boolean` | `false` | 是否显示 `border` |  |
| class | `any` | `undefined` | 类名 | 2.33.0 |
| closable | `boolean` | `true` | 是否显示 `close` 图标 |  |
| closeOnEsc | `boolean` | `true` | 是否在摁下 Esc 键的时候关闭对话框 | 2.26.4 |
| content | `string \| (() => VNodeChild)` | `undefined` | 对话框内容，可以是 `render` 函数 |  |
| iconPlacement | `'left' \| 'top'` | `'left'` | 图标的位置 |  |
| icon | `() => VNodeChild` | `undefined` | 对话框 `icon`, 需要是 `render` 函数 |  |
| loading | `boolean` | `false` | 是否显示 `loading` 状态 |  |
| maskClosable | `boolean` | `true` | 是否可以通过点击 `mask` 关闭对话框 |  |
| negativeButtonProps | `ButtonProps` | `undefined` | 取消按钮的属性 | 2.27.0 |
| negativeText | `string` | `undefined` | 不填对应的按钮不会出现 |  |
| positiveButtonProps | `ButtonProps` | `undefined` | 确认按钮的属性 | 2.27.0 |
| positiveText | `string` | `undefined` | 不填对应的按钮不会出现 |  |
| showIcon | `boolean` | `true` | 是否显示 `icon` |  |
| style | `string \| Object` | 样式 |  |
| title | `string \| (() => VNodeChild)` | `undefined` | 标题，可以是 `render` 函数 |  |
| transformOrigin | `'mouse' \| 'center'` | `'mouse'` | 对话框动画出现的位置 | 2.34.0 |
| type | `'error \| 'success' \| 'warning'` | `'warning'` | 对话框类型 |  |
| onAfterEnter | `() => void` | `undefined` | 出现动画完成执行的回调 | 2.33.0 |
| onAfterLeave | `() => void` | `undefined` | 关闭动画完成执行的回调 | 2.33.3 |
| onClose | `() => boolean \| Promise<boolean> \| any` | `undefined` | 默认行为是关闭确认框。返回 `false` 或者 `resolve false` 或者 `Promise` 被 `reject` 会避免默认行为 |  |
| onNegativeClick | `(e: MouseEvent) => boolean \| Promise<boolean> \| any` | `undefined` | 默认行为是关闭确认框。返回 `false` 或者 `resolve false` 或者 `Promise` 被 `reject` 会避免默认行为 |  |
| onPositiveClick | `(e: MouseEvent) => boolean \| Promise<boolean> \| any` | `undefined` | 默认行为是关闭确认框。返回 `false` 或者 `resolve false` 或者 `Promise` 被 `reject` 会避免默认行为 |  |
| onMaskClick | `() => void` | `undefined` | 点击蒙层后执行的回调 |  |

### DialogReactive API

#### DialogReactive Properties

下列属性都可以被动态修改。

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| bordered | `boolean` | 是否显示 `border` |  |
| class | `any` | 类名 | 2.33.0 |
| closable | `boolean` | 是否显示 `close` 图标 |  |
| closeOnEsc | `boolean` | 是否在摁下 Esc 键的时候关闭对话框 | 2.26.4 |
| content | `string \| (() => VNodeChild)` | 对话框内容，可以是 `render` 函数 |  |
| iconPlacement | `'left' \| 'top'` | 图标的位置 |  |
| icon | `() => VNodeChild` | 对话框 `icon`，需要是 `render` 函数 |  |
| loading | `boolean` | 是否显示 `loading` 状态 |  |
| maskClosable | `boolean` | 是否可以通过点击 `mask` 关闭对话框 |  |
| negativeButtonProps | `ButtonProps` | 取消按钮的属性 | 2.27.0 |
| negativeText | `string` | 不填对应的按钮不会出现 |  |
| positiveButtonProps | `ButtonProps` | 确认按钮的属性 | 2.27.0 |
| positiveText | `string` | 不填对应的按钮不会出现 |  |
| showIcon | `boolean` | 是否显示 `icon` |  |
| style | `string \| Object` | 样式 |  |
| title | `string \| (() => VNodeChild)` | 可以是 `render` 函数 |  |
| transformOrigin | `'mouse' \| 'center'` | 对话框动画出现的位置 | 2.34.0 |
| type | `'error \| 'success' \| 'warning'` | 对话框类型 |  |
| onAfterEnter | `() => void \| undefined` | 出现动画完成执行的回调 | 2.33.0 |
| onAfterLeave | `() => void \| undefined` | 关闭动画完成执行的回调 | 2.33.3 |
| onClose | `() => boolean \| Promise<boolean> \| any` | 默认行为是关闭确认框。返回 `false` 或者 resolve `false` 或者 `Promise` 被 `reject` 会避免默认行为 |  |
| onEsc | `() => void` | 焦点在 dialog 内部时按下 Esc 键的回调 | 2.32.0 |
| onNegativeClick | `(e: MouseEvent) => boolean \| Promise<boolean> \| any` | 默认行为是关闭确认框。返回 `false` 或者 resolve `false` 或者 `Promise` 被 `reject` 会避免默认行为 |  |
| onPositiveClick | `(e: MouseEvent) => boolean \| Promise<boolean> \| any` | 默认行为是关闭确认框。返回 `false` 或者 resolve `false` 或者 `Promise` 被 `reject` 会避免默认行为 |  |

#### DialogReactive Methods

| 名称    | 类型 | 说明          |
| ------- | ---- | ------------- |
| destroy | `()` | 关闭 `Dialog` |

### Dialog Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| bordered | `boolean` | `false` | 是否显示 `border` |  |
| closable | `boolean` | `true` | 是否显示 `close` 图标 |  |
| content | `string \| (() => VNodeChild)` | `undefined` | 对话框内容，可以是 `render` 函数 |  |
| icon-placement | `'left' \| 'top'` | `'left'` | 图标放置的位置 |  |
| icon | `() => VNodeChild` | `undefined` | 需要是 `render` 函数 |  |
| loading | `boolean` | `false` | 是否显示 `loading` 状态 |  |
| negative-button-props | `ButtonProps` | `undefined` | 取消按钮的属性 | 2.27.0 |
| negative-text | `string` | `undefined` | 取消按钮的文字，不填对应的按钮不会出现 |  |
| positive-button-props | `ButtonProps` | `undefined` | 确认按钮的属性 | 2.27.0 |
| positive-text | `string` | `undefined` | 确认按钮的文字，不填对应的按钮不会出现 |  |
| show-icon | `boolean` | `true` | 是否显示 `icon` |  |
| title | `string \| (() => VNodeChild)` | `undefined` | 对话框标题，可以是 `render` 函数 |  |
| type | `'error \| 'success' \| 'warning' \| 'info'` | `'warning'` | 对话框类型 |  |
| on-close | `() => void` | `undefined` | 点击关闭时执行的回调函数 |  |
| on-negative-click | `(e: MouseEvent) => void` | `undefined` | 执行 `negative` 时执行的回调函数 |  |
| on-positive-click | `(e: MouseEvent) => void` | `undefined` | 执行 `positive` 时执行的回调函数 |  |

### Dialog Slots

| 名称    | 参数 | 说明          |
| ------- | ---- | ------------- |
| action  | `()` | `action` 内容 |
| default | `()` | 对话框内容    |
| header  | `()` | `header` 内容 |
| icon    | `()` | `icon` 内容   |
