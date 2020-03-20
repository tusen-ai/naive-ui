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
|theme|`'light' \| 'dark'`|||
|open|`(option: NotificationOption, type: string = 'default') => NotificationEnvironment`|`type` can be `'default'`, `'warning'`, `'info'`, `'success'` and `'error'`|
|success|`(option: NofiticationOption) => NotificationEnvironment`||
|info|`(option: NofiticationOption) => NotificationEnvironment`||
|warning|`(option: NofiticationOption) => NotificationEnvironment`||
|error|`(option: NofiticationOption) => NotificationEnvironment`||

### $Notification Properties
|Name|Type|Default|Description|
|-|-|-|-|
|scrollable|`boolean`|`false`||

### NotificationOption Properties
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`|If set it will be used as the theme of notification. (It works nearly the same as <n-a to="n-message#about-theme">$NMessage's theme</n-a>, and in most cases you don't need to set the property.)|
|avatar|`() => VNode \| Array<VNode>`|`null`|Can be a render function|
|title|`string \| (() => VNode \| Array<VNode>)`|`null`|Can be a render function|
|description|`string \| (() => VNode \| Array<VNode>)`|`null`|Can be a render function|
|content|`string \| (() => VNode \| Array<VNode>)`|`null`|Can be a render function|
|meta|`string \| (() => VNode \| Array<VNode>)`|`null`|Can be a render function|
|action|`string \| (() => VNode \| Array<VNode>)`|`null`|Can be a render function|
|closable|`boolean`|`true`||
|onClose|`() => boolean \| Promise<boolean> \| any`|`() => {}`|The callback of notification closing. Returning `false`, promise resolve `false` or promise reject will cancel this closing.|
|onAfterHide|`function`|`null`||
|onAfterShow|`function`|`null`||
|duration|`number`|`null`|If not set, it won't automatically close. Unit is millisecond.|

### NotificationEnvironment API
#### NotificationEnvironment Properties
Properties of NofiticationEnvironment Instance can be dynamically set.

|Name|Type|Description|
|-|-|-|
|theme|`'light' \| 'dark'`|If set it will be used as the theme of notification. (It works nearly the same as <n-a to="n-message#about-theme">$NMessage's theme</n-a>, and in most cases you don't need to set the property.)|
|avatar|`() => VNode \| Array<VNode>`|Can be a render function|
|title|`string \| (() => VNode \| Array<VNode>)`|Can be a render function|
|description|`string \| (() => VNode \| Array<VNode>)`|Can be a render function|
|content|`string \| (() => VNode \| Array<VNode>)`|Can be a render function|
|meta|`string \| (() => VNode \| Array<VNode>)`|Can be a render function|
|action|`string \| (() => VNode \| Array<VNode>)`|Can be a render function|
|closable|`boolean`||
|onClose|`(next: function) => any`|Callback when close button is clicked. Only if next is called notification will close|
|onHide|`function`||
|onAfterHide|`function`||
|onAfterShow|`function`||

#### NotificationEnvironment Methods
|Name|Type|Description|
|-|-|-|
|hide|`()`||