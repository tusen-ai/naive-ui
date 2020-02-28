# Message
Oracle from the top(always) of the browser.
## Demos
```demo
basic
icon
timing
modify-content
manually-close
about-theme
```
## API
### $NMessage Methods
|Name|Type|Description|
|-|-|-|
|-|-|-|
|info|`(message: string, option?: MessageOption) => MessageEnvironment`||
|success|`(message: string, option?: MessageOption) => MessageEnvironment`||
|warning|`(message: string, option?: MessageOption) => MessageEnvironment`||
|error|`(message: string, option?: MessageOption) => MessageEnvironment`||
|loading|`(message: string, option?: MessageOption) => MessageEnvironment`||

### MessageOption Type
|Name|Type|Description|
|-|-|-|
|content|`string \|(function:() => VNode\|Array<VNode>)`|Can be a render function|
|icon|`string \| (function:() => VNode)`|Can be a render function|
|onHide|`function`||
|onAfterHide|`function`||

### MessageEnvironment API
#### MessageEnvironment Properties
|Name|Type|Description|
|-|-|-|
|content|`string \| (function:() => VNode\|Array<VNode>)`|Can be a render function|
|icon|`string \| (function:() => VNode)`|Can be a render function|
|type|`'info' \| 'success' \| 'warning' \| 'error' \| 'loading'`||
|onHide|`function`||
|onAfterHide|`function`||

#### MessageEnvironment Methods
|Name|Type|Description|
|-|-|-|
|hide|`()`||
