# 通知 Notification

通知某人。

像是通知组件这种东西优先级不那么高，所以我可以弄一堆没什么用的动画上去。

<n-space vertical>
<n-alert title="使用前提" type="warning">
  如果你想使用通知，你需要把调用其方法的组件放在 <n-text code>n-notification-provider</n-text> 内部并且使用 <n-text code>useNotification</n-text> 来获取 API。
</n-alert>
例如：

```html
<!-- App.vue -->
<n-notification-provider>
  <content />
</n-notification-provider>
```

```js
import { useNotification } from 'naive-ui'

// content
export default {
  setup () {
    const notification = useNotification()
    return {
      warning () {
        notification.warning('...')
      }
    }
  }
}
```

</n-space>

## 演示

```demo
basic
type
change-content
scrollable
closable
duration
```

## API

### NotificationProvider Props

| 名称       | 类型                    | 默认值   | 说明 |
| ---------- | ----------------------- | -------- | ---- |
| scrollable | `boolean`               | `true`   |      |
| to         | `string \| HTMLElement` | `'body'` |      |

### `notification` Injection Methods

| 名称    | 类型                                                   | 说明 |
| ------- | ------------------------------------------------------ | ---- |
| create  | `(option: NotificationOption) => NotificationReactive` |      |
| error   | `(option: NotificationOption) => NotificationReactive` |      |
| info    | `(option: NotificationOption) => NotificationReactive` |      |
| success | `(option: NotificationOption) => NotificationReactive` |      |
| warning | `(option: NotificationOption) => NotificationReactive` |      |

### NotificationOption Properties

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| action | `string \| (() => VNodeChild)` | `undefined` | 可以是 render 函数 |
| avatar | `() => VNodeChild` | `undefined` | 可以是 render 函数 |
| closable | `boolean` | `true` |  |
| content | `string \| (() => VNodeChild)` | `undefined` | 可以是 render 函数 |
| description | `string \| (() => VNodeChild)` | `undefined` | 可以是 render 函数 |
| duration | `number` | `undefined` | 如果没有设定则不会自动关闭，单位毫秒 |
| meta | `string \| (() => VNodeChild)` | `undefined` | 可以是 render 函数 |
| title | `string \| (() => VNodeChild)` | `undefined` | 可以是 render 函数 |
| onAfterEnter | `Function` | `undefined` |  |
| onAfterLeave | `Function` | `undefined` |  |
| onClose | `() => boolean \| Promise<boolean>` | `undefined` | 关闭通知的回调。返回 `false`、Promise resolve `false` 或者 reject 会取消这次关闭 |
| onLeave | `Function` | `undefined` |  |

### NotificationReactive API

#### NotificationReactive Properties

NotificationReactive 实例的属性可以被动态改变。

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| action | `string \| (() => VNodeChild)` | 可以是 render 函数 |
| avatar | `() => VNodeChild` | 可以是 render 函数 |
| closable | `boolean` |  |
| content | `string \| (() => VNodeChild)` | 可以是 render 函数 |
| description | `string \| (() => VNodeChild)` | 可以是 render 函数 |
| meta | `string \| (() => VNodeChild)` | 可以是 render 函数 |
| title | `string \| (() => VNodeChild)` | 可以是 render 函数 |
| onAfterEnter | `Function` |  |
| onAfterLeave | `Function` |  |
| onClose | `() => boolean \| Promise<boolean>` | 关闭通知的回调。返回 `false`、Promise resolve `false` 或者 reject 会取消这次关闭 |
| onLeave | `Function` |  |

#### NotificationReactive Methods

| 名称    | 类型 | 说明       |
| ------- | ---- | ---------- |
| destroy | `()` | 销毁该通知 |
