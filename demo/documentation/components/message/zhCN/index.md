# 信息 Message
从浏览器（一般是）顶部降下来的神谕。
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
|名称|类型|介绍|
|-|-|-|
|info|`(content: string, option?: MessageOption) => MessageEnvironment`||
|success|`(content: string, option?: MessageOption) => MessageEnvironment`||
|warning|`(content: string, option?: MessageOption) => MessageEnvironment`||
|error|`(content: string, option?: MessageOption) => MessageEnvironment`||
|loading|`(content: string, option?: MessageOption) => MessageEnvironment`||

### MessageOption Type
|名称|类型|介绍|
|-|-|-|
|content|`string \| function`|Can be a render function|
|icon|`string \| function`|Can be a render function|
|onHide|`function`||
|onAfterHide|`function`||

### MessageEnvironment API
#### MessageEnvironment Properties
|名称|类型|介绍|
|-|-|-|
|content|`string \| function`|Can be a render function|
|icon|`string \| function`|Can be a render function|
|type|`'info' \| 'success' \| 'warning' \| 'error' \| 'loading'`||
|onHide|`function`||
|onAfterHide|`function`||

#### MessageEnvironment Methods
|名称|类型|介绍|
|-|-|-|
|hide|`()`||