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

### MessageOption Properties
|Name|Type|Description|
|-|-|-|
|content|`string \|(() => VNode \| Array<VNode>)`|Can be a render function|
|icon|`() => VNode`|Can be a render function|
|theme|`'light' \| 'dark'`||
|onHide|`function`||
|onAfterHide|`function`||

### MessageEnvironment API
#### MessageEnvironment Properties
|Name|Type|Description|
|-|-|-|
|content|`string \| (() => VNode \| Array<VNode>)`|Can be a render function|
|icon|`string \| (() => VNode)`|Can be a render function|
|type|`'info' \| 'success' \| 'warning' \| 'error' \| 'loading'`||
|onHide|`function`||
|onAfterHide|`function`||

#### MessageEnvironment Methods
|Name|Type|Description|
|-|-|-|
|hide|`()`||
