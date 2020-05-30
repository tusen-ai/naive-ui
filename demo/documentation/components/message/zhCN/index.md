# 信息 Message
（一般是）从浏览器顶部降下来的神谕。
## 演示
```demo
basic
icon
timing
closable
modify-content
manually-close
about-theme
```

## API
### $NMessage Methods
|名称|类型|说明|
|-|-|-|
|info|`(content: string, option?: MessageOption) => MessageEnvironment`||
|success|`(content: string, option?: MessageOption) => MessageEnvironment`||
|warning|`(content: string, option?: MessageOption) => MessageEnvironment`||
|error|`(content: string, option?: MessageOption) => MessageEnvironment`||
|loading|`(content: string, option?: MessageOption) => MessageEnvironment`||

### MessageOption Properties
|名称|类型|说明|
|-|-|-|
|content|`string \| (() => VNode \| Array<VNode>)`|可以是 render 函数|
|icon|`() => VNode`|可以是 render 函数|
|theme|`'light' \| 'dark'`||
|closable|`boolean`||
|onHide|`Function`||
|onAfterHide|`Function`||

### MessageEnvironment API
#### MessageEnvironment Properties
|名称|类型|说明|
|-|-|-|
|content|`string \| (() => VNode \| Array<VNode>)`|可以是 render 函数|
|icon|`string \| (() => VNode)`|可以是 render 函数|
|type|`'info' \| 'success' \| 'warning' \| 'error' \| 'loading'`||
|closable|`boolean`||
|onHide|`Function`||
|onAfterHide|`Function`||

#### MessageEnvironment Methods
|名称|类型|说明|
|-|-|-|
|hide|`()`||