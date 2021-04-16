# 对话框 Dialog

执行之前，请确认。

<n-space vertical>
<n-alert title="使用前提" type="warning">
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
import { useDialog } from 'naive-ui'

// content
export default {
  setup () {
    const dialog = useDialog()
    return {
      warning () {
        dialog.warning(options)
      }
    }
  }
}
```

</n-space>

## 演示

```demo
basic
async
use-component
```

## API

### `dialog` Injection API

| 名称       | 类型                                        | 说明 |
| ---------- | ------------------------------------------- | ---- |
| destroyAll | `() => void`                                |      |
| create     | `(options: DialogOption) => DialogReactive` |      |
| error      | `(options: DialogOption) => DialogReactive` |      |
| info       | `(options: DialogOption) => DialogReactive` |      |
| success    | `(options: DialogOption) => DialogReactive` |      |
| warning    | `(options: DialogOption) => DialogReactive` |      |

### DialogOption Properties

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` |  |
| closable | `boolean` | `true` |  |
| content | `string \| (() => VNode \| Array<VNode>)` | `undefined` | 可以是 render 函数 |
| icon-placement | `'left' \| 'top'` | `'left'` |  |
| icon | `() => VNode \| Array<VNode>` | `undefined` | 需要是 render 函数 |
| loading | `boolean` | `false` |  |
| negative-text | `string` | `undefined` | 不填对应的按钮不会出现 |
| positive-text | `string` | `undefined` | 不填对应的按钮不会出现 |
| show-icon | `boolean` | `true` |  |
| title | `string \| (() => VNode \| Array<VNode>)` | `undefined` | 可以是 render 函数 |
| type | `'error \| 'success' \| 'warning'` | `'warning'` |  |
| onClose | `() => boolean \| Promise<boolean> \| any` | `undefined` | 默认行为是关闭确认框。返回 `false` 或者 resolve `false` 或者 Promise 被 reject 会避免默认行为 |
| onNegativeClick | `() => boolean \| Promise<boolean> \| any` | `undefined` | 默认行为是关闭确认框。返回 `false` 或者 resolve `false` 或者 Promise 被 reject 会避免默认行为 |
| onPositiveClick | `() => boolean \| Promise<boolean> \| any` | `undefined` | 默认行为是关闭确认框。返回 `false` 或者 resolve `false` 或者 Promise 被 reject 会避免默认行为 |

### DialogReactive API

#### DialogReactive Properties

下列属性都可以被动态修改。

| 名称 | 类型 | 说明 |
| --- | --- | --- | --- |
| bordered | `boolean` |  |
| closable | `boolean` |  |
| content | `string \| (() => VNode \| Array<VNode>)` | 可以是 render 函数 |
| icon-placement | `'left' \| 'top'` | `'left'` |  |
| icon | `() => VNode \| Array<VNode>` | 需要是 render 函数 |
| loading | `boolean` |  |
| negative-text | `string` | 不填对应的按钮不会出现 |
| positive-text | `string` | 不填对应的按钮不会出现 |
| show-icon | `boolean` |  |
| title | `string \| (() => VNode \| Array<VNode>)` | 可以是 render 函数 |
| type | `'error \| 'success' \| 'warning'` |  |
| onClose | `() => boolean \| Promise<boolean> \| any` |  |
| onNegativeClick | `() => boolean \| Promise<boolean> \| any` |  |
| onPositiveClick | `() => boolean \| Promise<boolean> \| any` |  |

#### DialogReactive Methods

| 名称    | 类型 | 说明        |
| ------- | ---- | ----------- |
| destroy | `()` | 关闭 Dialog |

## Props

### Dialog Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` |  |
| closable | `boolean` | `boolean` |  |
| content | `string \| (() => VNode \| Array<VNode>)` | `undefined` | 可以是 render 函数 |
| icon | `() => VNode \| Array<VNode>` | `undefined` | 需要是 render 函数 |
| loading | `boolean` | `false` |  |
| negative-text | `string` | `undefined` | 不填对应的按钮不会出现 |
| positive-text | `string` | `undefined` | 不填对应的按钮不会出现 |
| show-icon | `boolean` | `true` |  |
| title | `string \| (() => VNode \| Array<VNode>)` | `undefined` | 可以是 render 函数 |
| type | `'error \| 'success' \| 'warning'` | `'warning'` |  |
| on-close | `() => void` |  |
| on-negative-click | `() => void` |  |
| on-positive-click | `() => void` |  |

## Slots

### Dialog Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| action  | `()` |      |
| default | `()` | 内容 |
| header  | `()` |      |
| icon    | `()` |      |
