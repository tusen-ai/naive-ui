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
#### $Notification API
#### $NNotification Methods
|名称|类型|介绍|
|-|-|-|
|open|`(option: NotificationOption, type: string = 'default') => NotificationEnvironment`|`type` 可以是 `'default'`, `'warning'`, `'info'`, `'success'` 或 `'error'`|
|success|`(option: NofiticationOption) => NotificationEnvironment`||
|info|`(option: NofiticationOption) => NotificationEnvironment`||
|warning|`(option: NofiticationOption) => NotificationEnvironment`||
|error|`(option: NofiticationOption) => NotificationEnvironment`||

#### $Notification Properties

|名称|类型|默认值|介绍|
|-|-|-|-|
|scrollable|`boolean`|`false`||

### NotificationOption API
#### NotificationOption Type

|名称|类型|默认值|介绍|
|-|-|-|-|
|avatar|`string \| function`|`null`|可以是 render 函数|
|title|`string \| function`|`null`|可以是 render 函数|
|description|`string \| function`|`null`|可以是 render 函数|
|content|`string \| function`|`null`|可以是 render 函数|
|meta|`string \| function`|`null`|可以是 render 函数|
|action|`string \| function`|`null`|可以是 render 函数|
|closable|`boolean`|`true`||
|onClose|`(next: function) => any`|`next => next()`|只有调用了 next 通知才会被关闭|
|onAfterHide|`function`|`null`||
|onAfterShow|`function`|`null`||
|duration|`number`|`null`|如果没有设定则不会自动关闭，单位毫秒|

### NotificationEnvironment API
#### NotificationEnvironment Properties
NofiticationEnvironment 实例的属性可以被动态改变。

|名称|类型|介绍|
|-|-|-|
|avatar|`string \| function`|可以是 render 函数|
|title|`string \| function`|可以是 render 函数|
|description|`string \| function`|可以是 render 函数|
|content|`string \| function`|可以是 render 函数|
|meta|`string \| function`|可以是 render 函数|
|action|`string \| function`|可以是 render 函数|
|closable|`boolean`||
|onClose|`(next: function) => any`|点击了关闭按钮的回调。只有调用了 next 通知才会被关闭|
|onHide|`function`||
|onAfterHide|`function`||
|onAfterShow|`function`||

#### NotificationEnvironment Methods
|名称|类型|介绍|
|-|-|-|
|hide|`()`||