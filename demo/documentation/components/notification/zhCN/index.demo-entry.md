# 通知 Notification

通知某人。

像是通知组件这种东西优先级不那么高，所以我可以弄一堆没什么用的动画上去。

<n-space vertical>
<n-alert title="使用前提" type="warning">
  如果你想使用通知，你需要把调用其方法的组件放在 <n-text code>n-nofitication-provider</n-text> 内部并且注入 <n-text code>nofitication</n-text>。
</n-alert>
例如：

```html
<!-- App.vue -->
<n-nofitication-provider>
  <content />
</n-nofitication-provider>
```

```js
// content
export default {
  inject: ['nofitication'],
  methods: {
    nofity() {
      this.nofitication
        .create
        // ...
        ()
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
| action | `string \| (() => VNode \| Array<VNode>)` | `undefined` | 可以是 render 函数 |
| avatar | `() => VNode \| Array<VNode>` | `undefined` | 可以是 render 函数 |
| closable | `boolean` | `true` |  |
| content | `string \| (() => VNode \| Array<VNode>)` | `undefined` | 可以是 render 函数 |
| description | `string \| (() => VNode \| Array<VNode>)` | `undefined` | 可以是 render 函数 |
| duration | `number` | `undefined` | 如果没有设定则不会自动关闭，单位毫秒 |
| meta | `string \| (() => VNode \| Array<VNode>)` | `undefined` | 可以是 render 函数 |
| theme | `'light' \| 'dark' \| string` | `undefined` |  |
| title | `string \| (() => VNode \| Array<VNode>)` | `undefined` | 可以是 render 函数 |
| onAfterEnter | `Function` | `undefined` |  |
| onAfterLeave | `Function` | `undefined` |  |
| onClose | `() => boolean \| Promise<boolean>` | `undefined` | 关闭通知的回调。返回 `false`、Promise resolve `false` 或者 reject 会取消这次关闭 |
| onLeave | `Function` | `undefined` |  |

### NotificationReactive API

#### NotificationReactive Properties

NotificationReactive 实例的属性可以被动态改变。

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| action | `string \| (() => VNode \| Array<VNode>)` | 可以是 render 函数 |
| avatar | `() => VNode \| Array<VNode>` | 可以是 render 函数 |
| closable | `boolean` |  |
| content | `string \| (() => VNode \| Array<VNode>)` | 可以是 render 函数 |
| description | `string \| (() => VNode \| Array<VNode>)` | 可以是 render 函数 |
| meta | `string \| (() => VNode \| Array<VNode>)` | 可以是 render 函数 |
| theme | `'light' \| 'dark' \| null \| string` |  |
| title | `string \| (() => VNode \| Array<VNode>)` | 可以是 render 函数 |
| onAfterEnter | `Function` |  |
| onAfterLeave | `Function` |  |
| onClose | `() => boolean \| Promise<boolean>` | 关闭通知的回调。返回 `false`、Promise resolve `false` 或者 reject 会取消这次关闭 |
| onLeave | `Function` |  |

#### NotificationReactive Methods

| 名称    | 类型 | 说明       |
| ------- | ---- | ---------- |
| destroy | `()` | 销毁该通知 |
