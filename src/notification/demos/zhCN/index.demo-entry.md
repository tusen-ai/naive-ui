# 通知 Notification

通知某人。

像是通知组件这种东西优先级不那么高，所以我可以弄一堆没什么用的动画上去。

<n-space vertical size="large">
<n-alert title="使用前提" type="warning" :bordered="false">
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
import { defineComponent } from 'vue'
import { useNotification } from 'naive-ui'

// content
export default defineComponent({
  setup () {
    const notification = useNotification()
    return {
      warning () {
        notification.warning({
          content: '...'
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
type.vue
change-content.vue
scrollable.vue
closable.vue
duration.vue
max.vue
placement.vue
error-debug.vue
rtl-debug.vue
```

## API

### NotificationProvider Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| container-style | `string \| Object` | `undefined` | 容器的样式 | 2.25.0 |
| max | `number` | `undefined` | 限制通知框显示的个数 |  |
| placement | `'top' \| 'bottom' \| 'top-right' \| 'top-left' \| 'bottom-left' \| 'bottom -right'` | `top-right` | 所有通知框显示的位置 | `'top' \| 'bottom'` 2.29.0 |
| scrollable | `boolean` | `true` | 通知是否可滚动，对于 `placement` 为 `'top'` 和 `'bottom'` 不生效 |  |
| to | `string \| HTMLElement` | `'body'` | `Notification` 容器节点的位置 |  |

### notification Injection Methods

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| create | `(option: NotificationOption) => NotificationReactive` | 创建通知框 |
| destroyAll | `() => void` | 销毁所有弹出的通知框 |
| error | `(option: NotificationOption) => NotificationReactive` | 调用 `error` 类型的通知框 |
| info | `(option: NotificationOption) => NotificationReactive` | 调用 `info` 类型的通知框 |
| success | `(option: NotificationOption) => NotificationReactive` | 调用 `success` 类型的通知框 |
| warning | `(option: NotificationOption) => NotificationReactive` | 调用 `warning` 类型的通知框 |

### NotificationOption Properties

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| action | `string \| (() => VNodeChild)` | `undefined` | 操作区域的内容,可以是 render 函数 |  |
| avatar | `() => VNodeChild` | `undefined` | 头像区域的内容 |  |
| closable | `boolean` | `true` | 是否显示 close 图标 |  |
| content | `string \| (() => VNodeChild)` | `undefined` | 通知框内容，可以是 render 函数 |  |
| description | `string \| (() => VNodeChild)` | `undefined` | 描述的内容，可以是 render 函数 |  |
| duration | `number` | `undefined` | 如果没有设定则不会自动关闭，单位毫秒 |  |
| keepAliveOnHover | `boolean` | `false` | 当鼠标移入时是否保持通知框显示 | 2.32.0 |
| meta | `string \| (() => VNodeChild)` | `undefined` | `meta` 信息，可以是 render 函数 |
| title | `string \| (() => VNodeChild)` | `undefined` | `title` 信息，可以是 render 函数 |
| onAfterEnter | `Function` | `undefined` | 过渡动画进入执行完后执行的回调 |  |
| onAfterLeave | `Function` | `undefined` | 过渡动画离开执行完后执行的回调 |  |
| onClose | `() => boolean \| Promise<boolean>` | `undefined` | 关闭通知的回调，返回 `false`、Promise resolve `false` 或者 reject 会取消这次关闭 |  |
| onLeave | `Function` | `undefined` | 过渡动画离开时执行的回调 |  |

### NotificationReactive API

#### NotificationReactive Properties

NotificationReactive 实例的属性可以被动态改变。

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| action | `string \| (() => VNodeChild)` | 操作区域的内容,可以是 render 函数 |
| avatar | `() => VNodeChild` | 头像区域的内容，可以是 render 函数 |
| closable | `boolean` | 是否显示 close 图标 |
| content | `string \| (() => VNodeChild)` | 通知框内容，可以是 render 函数 |
| description | `string \| (() => VNodeChild)` | 描述的内容，可以是 render 函数 |
| duration | `number` | 如果没有设定则不会自动关闭，单位毫秒 |
| meta | `string \| (() => VNodeChild)` | `meta` 信息，可以是 render 函数 |
| title | `string \| (() => VNodeChild)` | `title` 信息，可以是 render 函数 |
| onAfterEnter | `Function` | 过渡动画进入执行完后执行的回调 |
| onAfterLeave | `Function` | 过渡动画离开进入执行完后执行的回调 |
| onClose | `() => boolean \| Promise<boolean>` | 关闭通知的回调。返回 `false`、Promise resolve `false` 或者 reject 会取消这次关闭 |
| onLeave | `Function` | 过渡动画离开动画执行时的回调 |

#### NotificationReactive Methods

| 名称    | 类型 | 说明       |
| ------- | ---- | ---------- |
| destroy | `()` | 销毁该通知 |
