# 信息 Message
（一般是）从浏览器顶部降下来的神谕。

<n-alert title="注意" type="warning">
  以下所有例子需要 <n-text code>n-message-provider</n-text> 的包裹，并在组件中注入 <n-text code>message</n-text>。
</n-alert>

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
### MessageProvider Props
|名称|类型|默认值|说明|
|-|-|-|-|
|to|`string \| HTMLElement`|`'body'`|Message 容器节点的位置|

### MessageProvider Injection API
#### MessageProvider Injection Methods
|名称|类型|说明|
|-|-|-|
|info|`(content: string, option?: MessageOption) => MessageReactive`||
|success|`(content: string, option?: MessageOption) => MessageReactive`||
|warning|`(content: string, option?: MessageOption) => MessageReactive`||
|error|`(content: string, option?: MessageOption) => MessageReactive`||
|loading|`(content: string, option?: MessageOption) => MessageReactive`||

#### MessageOption Properties
|名称|类型|说明|
|-|-|-|
|closable|`boolean`||
|content|`string \| (() => VNode \| Array<VNode>)`|信息内容|
|icon|`() => VNode`|信息图标|
|onAfterLeave|`Function`|信息消失动画结束的回调|
|onLeave|`Function`|信息开始消失的回调|
|theme|`'light' \| 'dark' \| string \| null`||

#### MessageReactive Properties
|名称|类型|说明|
|-|-|-|
|closable|`boolean`||
|content|`string \| (() => VNode \| Array<VNode>)`|信息内容|
|icon|`() => VNode`|信息图标|
|onAfterLeave|`Function`|信息消失动画结束的回调|
|onLeave|`Function`|信息开始消失的回调|
|theme|`'light' \| 'dark' \| string \| null`||
|type|`'info' \| 'success' \| 'warning' \| 'error' \| 'loading'`||

#### MessageReactive Methods
|名称|类型|说明|
|-|-|-|
|destroy|`()`||