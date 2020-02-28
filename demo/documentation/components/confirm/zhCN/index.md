# 确认 Confirm
执行之前，请确认。

## 演示
```demo
basic
async
use-component
```
## API
### $NConfirm API
|名称|类型|说明|
|-|-|-|
|warning|`(options: ConfirmOption) => ConfirmEnvironment`||
|success|`(options: ConfirmOption) => ConfirmEnvironment`||
|error|`(options: ConfirmOption) => ConfirmEnvironment`||
|destroyAll|`() => void`||

### ConfirmOption API
|名称|类型|默认值|说明|
|-|-|-|-|
|type|`'error \| 'success' \| 'warning'`|`'warning'`||
|title|`string \| (function:() => VNode\|Array<VNode>)`|`null`|可以是 render 函数|
|closable|`boolean`|`boolean`||
|icon|`(function:() => VNode\|Array<VNode>)`|`null`|需要是 render 函数|
|negative-text|`string`|`null`|不填对应的按钮不会出现|
|positive-text|`string`|`null`|不填对应的按钮不会出现|
|content|`string \| (function:() => VNode\|Array<VNode>)`|`null`|可以是 render 函数|
|show-icon|`boolean`|`true`||
|loading|`boolean`|`false`||
|bordered|`boolean`|`false`||
|onPositiveClick|`(hide: function) => any`|`hide => hide()`||
|onNegativeClick|`(hide: function) => any`|`hide => hide()`|
|onClose|`(hide: function) => any`|`hide => hide()`||

### ConfirmEnvironment API
#### ConfirmEnvironment Properties
下列属性都可以被动态修改。

|名称|类型|说明|
|-|-|-|
|type|`'error \| 'success' \| 'warning'`||
|title|`string \| (function:() => VNode\|Array<VNode>)`|可以是 render 函数|
|closable|`boolean`||
|icon|`(function:() => VNode\|Array<VNode>)`|需要是 render 函数|
|negative-text|`string`|不填对应的按钮不会出现|
|positive-text|`string`|不填对应的按钮不会出现|
|content|`string \| (function:() => VNode\|Array<VNode>)`|可以是 render 函数|
|show-icon|`boolean`||
|loading|`boolean`||
|bordered|`boolean`||
|onPositiveClick|`(hide: function) => any`||
|onNegativeClick|`(hide: function) => any`||
|onClose|`(hide: function) => any`||

#### ConfirmEnvironment Methods
|名称|类型|说明|
|-|-|-|
|hide|`()`|关闭 Confirm|

## Props
### Confirm Props
|名称|类型|默认值|说明|
|-|-|-|-|
|type|`'error \| 'success' \| 'warning'`|`'warning'`||
|title|`string \| (function:() => VNode\|Array<VNode>)`|`null`|可以是 render 函数|
|closable|`boolean`|`boolean`||
|icon|`(function:() => VNode\|Array<VNode>)`|`null`|需要是 render 函数|
|negative-text|`string`|`null`|不填对应的按钮不会出现|
|positive-text|`string`|`null`|不填对应的按钮不会出现|
|content|`string \| (function:() => VNode\|Array<VNode>)`|`null`|可以是 render 函数|
|show-icon|`boolean`|`true`||
|loading|`boolean`|`false`||
|bordered|`boolean`|`false`||

## Events
### Confirm Events
|名称|参数|说明|
|-|-|-|
|positive-click|`()`||
|negative-click|`()`||
|close|`()`||

## Slots
### Confirm Slots
|名称|参数|说明|
|-|-|-|
|icon|`()`||
|header|`()`||
|default|`()`|内容|
|action|`()`||

