# 信息 Message
（一般是）从浏览器顶部降下来的神谕。
## 演示
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
|名称|类型|说明|
|-|-|-|
|info|`(content: string, option?: MessageOption) => MessageEnvironment`||
|success|`(content: string, option?: MessageOption) => MessageEnvironment`||
|warning|`(content: string, option?: MessageOption) => MessageEnvironment`||
|error|`(content: string, option?: MessageOption) => MessageEnvironment`||
|loading|`(content: string, option?: MessageOption) => MessageEnvironment`||

### MessageOption Type
|名称|类型|说明|
|-|-|-|
|content|`string \| (() => VNode \| Array<VNode>)`|可以是 render 函数|
|icon|`string \| (() => VNode)`|可以是 render 函数|
|onHide|`function`||
|onAfterHide|`function`||

### MessageEnvironment API
#### MessageEnvironment Properties
|名称|类型|说明|
|-|-|-|
|content|`string \| (() => VNode \| Array<VNode>)`|可以是 render 函数n|
|icon|`string \| (() => VNode)`|可以是 render 函数|
|type|`'info' \| 'success' \| 'warning' \| 'error' \| 'loading'`||
|onHide|`function`||
|onAfterHide|`function`||

#### MessageEnvironment Methods
|名称|类型|说明|
|-|-|-|
|hide|`()`||