# 通知 Notification
通知某人。

UI 同志很早就设计完了。但是，你也知道，像是通知组件这种东西优先级不那么高，所以我可以弄一堆没什么用的动画上去。
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
|名称|类型|默认值|说明|
|-|-|-|-|
|scrollable|`boolean`|`true`||
|to|`string \| HTMLElement`|`'body'`||

### NotificationProvider Injection API
#### NotificationProvider Injection Methods
|名称|类型|说明|
|-|-|-|
|create|`(option: NotificationOption) => NotificationReactive`||
|success|`(option: NotificationOption) => NotificationReactive`||
|info|`(option: NotificationOption) => NotificationReactive`||
|warning|`(option: NotificationOption) => NotificationReactive`||
|error|`(option: NotificationOption) => NotificationReactive`||

### NotificationOption API
#### NotificationOption Properties
|名称|类型|默认值|说明|
|-|-|-|-|
|action|`string \| (() => VNode \| Array<VNode>)`|`null`|可以是 render 函数|
|avatar|`() => VNode \| Array<VNode>`|`null`|可以是 render 函数|
|closable|`boolean`|`true`||
|content|`string \| (() => VNode \| Array<VNode>)`|`null`|可以是 render 函数|
|description|`string \| (() => VNode \| Array<VNode>)`|`null`|可以是 render 函数|
|duration|`number`|`null`|如果没有设定则不会自动关闭，单位毫秒|
|meta|`string \| (() => VNode \| Array<VNode>)`|`null`|可以是 render 函数|
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|title|`string \| (() => VNode \| Array<VNode>)`|`null`|可以是 render 函数|
|onAfterEnter|`Function`|`null`||
|onAfterLeave|`Function`|`null`||
|onClose|`() => boolean \| Promise<boolean>`|`() => {}`|关闭通知的回调。返回 `false`、Promise resolve `false` 或者 reject 会取消这次关闭|
|onLeave|`Function`||

### NotificationReactive API
#### NotificationReactive Properties
NofiticationEnvironment 实例的属性可以被动态改变。

|名称|类型|说明|
|-|-|-|
|action|`string \| (() => VNode \| Array<VNode>)`|可以是 render 函数|
|avatar|`() => VNode \| Array<VNode>`|可以是 render 函数|
|closable|`boolean`||
|content|`string \| (() => VNode \| Array<VNode>)`|可以是 render 函数|
|description|`string \| (() => VNode \| Array<VNode>)`|可以是 render 函数|
|meta|`string \| (() => VNode \| Array<VNode>)`|可以是 render 函数|
|theme|`'light' \| 'dark' \| null \| string`||
|title|`string \| (() => VNode \| Array<VNode>)`|可以是 render 函数|
|onAfterEnter|`Function`||
|onAfterLeave|`Function`||
|onClose|`() => boolean \| Promise<boolean>`|`() => {}`|关闭通知的回调。返回 `false`、Promise resolve `false` 或者 reject 会取消这次关闭|
|onLeave|`Function`||

#### NotificationReactive Methods
|名称|类型|说明|
|-|-|-|
|destroy|`()`|销毁该通知|