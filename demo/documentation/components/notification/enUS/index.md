# Notification
If something is to be telled to somebody.

UI has designed it long long ago. However, you know, notification component is always with low piority so I can make a lot of useless animations on it.
## Demos
```demo
basic
type
change-content
scrollable
closable
duration
```
## API
### $NNotification Methods
|Name|Type|Description|
|-|-|-|
|open|`(option: NotificationOption, type: string = 'default') => NotificationEnvironment`|`type` can be `'default'`, `'warning'`, `'info'`, `'success'` and `'error'`|
|success|`(option: NofiticationOption) => NotificationEnvironment`||
|info|`(option: NofiticationOption) => NotificationEnvironment`||
|warning|`(option: NofiticationOption) => NotificationEnvironment`||
|error|`(option: NofiticationOption) => NotificationEnvironment`||

### $Notification Properties
|Name|Type|Default|Description|
|-|-|-|-|
|scrollable|`boolean`|`false`||

### NotificationOption Type
|Name|Type|Default|Description|
|-|-|-|-|
|avatar|`string \| function`|`null`|Can be render function|
|title|`string \| function`|`null`|Can be render function|
|description|`string \| function`|`null`|Can be render function|
|content|`string \| function`|`null`|Can be render function|
|meta|`string \| function`|`null`|Can be render function|
|action|`string \| function`|`null`|Can be render function|
|closable|`boolean`|`true`||
|onClose|`(next: function) => any`|`next => next()`|Only if next is called notification will close.|
|onAfterHide|`function`|`null`||
|onAfterShow|`function`|`null`||
|duration|`number`|`null`|If not set, it won't automatically close. Unit is millisecond.|

### NotificationEnvironment API
#### NotificationEnvironment Properties
Properties of Instance of NofiticationEnvironment can be dynamically set.

|Name|Type|Description|
|-|-|-|
|avatar|`string \| function`|Can be render function|
|title|`string \| function`|Can be render function|
|description|`string \| function`|Can be render function|
|content|`string \| function`|Can be render function|
|meta|`string \| function`|Can be render function|
|action|`string \| function`|Can be render function|
|closable|`boolean`||
|onClose|`(next: function) => any`|Callback when close button is clicked. Only if next is called notification will close|
|onHide|`function`||
|onAfterHide|`function`||
|onAfterShow|`function`||

#### NotificationEnvironment Methods
|Name|Type|Description|
|-|-|-|
|hide|`()`||