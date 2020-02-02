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
### $NMessage API
|Property|Type|Description|
|-|-|-|
|info|`(option: MessageOption) : MessageEnvironment`||
|success|`(option: MessageOption) : MessageEnvironment`||
|warning|`(option: MessageOption) : MessageEnvironment`||
|error|`(option: MessageOption) : MessageEnvironment`||
|loading|`(option: MessageOption) : MessageEnvironment`||

### MessageOption API
|Property|Type|Description|
|-|-|-|
|content|`string \| function`|Can be a render function|
|icon|`string \| function`|Can be a render function|
|onHide|`function`||
|onAfterHide|`function`||

### MessageEnvironment API
#### MessageEnvironment Properties
|Property|Type|Description|
|-|-|-|
|content|`string \| function`|Can be a render function|
|icon|`string \| function`|Can be a render function|
|type|`'info' \| 'success' \| 'warning' \| 'error' \| 'loading'`||
|onHide|`function`||
|onAfterHide|`function`||

#### MessageEnvironment Methods
|Method|Type|Description|
|-|-|-|
|hide|`()`||
