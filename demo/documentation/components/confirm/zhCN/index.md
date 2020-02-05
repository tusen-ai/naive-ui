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
|名称|类型|介绍|
|-|-|-|
|warning|`(options: ConfirmOption) => ConfirmEnvironment`||
|success|`(options: ConfirmOption) => ConfirmEnvironment`||
|error|`(options: ConfirmOption) => ConfirmEnvironment`||
|destroyAll|`() => void`||

### ConfirmOption API
|名称|类型|默认值|介绍|
|-|-|-|-|
|type|`'error \| 'success' \| 'warning'`|`'warning'`||
|title|`string \| function`|`null`|可以是 render 函数|
|closable|`boolean`|`boolean`||
|icon|`function`|`null`|需要是 render 函数|
|negative-text|`string`|`null`||
|positive-text|`string`|`null`||
|content|`string \| function`|`null`|可以是 render 函数|
|show-icon|`boolean`|`true`||
|loading|`boolean`|`false`||
|bordered|`boolean`|`false`||
|onPositiveClick|`(hide: function) => any`|`hide => hide()`||
|onNegativeClick|`(hide: function) => any`|`hide => hide()`|
|onClose|`(hide: function) => any`|`hide => hide()`||

### ConfirmEnvironment API
#### ConfirmEnvironment Properties
下列属性都可以被动态修改。

|名称|类型|介绍|
|-|-|-|
|type|`'error \| 'success' \| 'warning'`||
|title|`string \| function`|可以是 render 函数|
|closable|`boolean`||
|icon|`function`|需要是 render 函数|
|negative-text|`string`||
|positive-text|`string`||
|content|`string \| function`|可以是 render 函数|
|show-icon|`boolean`||
|loading|`boolean`||
|bordered|`boolean`||
|onPositiveClick|`(hide: function) => any`||
|onNegativeClick|`(hide: function) => any`||
|onClose|`(hide: function) => any`||

#### ConfirmEnvironment Methods
|名称|类型|介绍|
|-|-|-|
|hide|`()`|关闭 Confirm|

## Props
### Confirm Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|type|`'error \| 'success' \| 'warning'`|`'warning'`||
|title|`string \| function`|`null`|可以是 render 函数|
|closable|`boolean`|`boolean`||
|icon|`function`|`null`|需要是 render 函数|
|negative-text|`string`|`null`||
|positive-text|`string`|`null`||
|content|`string \| function`|`null`|可以是 render 函数|
|show-icon|`boolean`|`true`||
|loading|`boolean`|`false`||
|bordered|`boolean`|`false`||

## Events
### Confirm Events
|名称|参数|介绍|
|-|-|-|
|positive-click|`()`||
|negative-click|`()`||
|close|`()`||

## Slots
### Confirm Slots
|名称|参数|介绍|
|-|-|-|
|icon|`()`||
|header|`()`||
|default|`()`|内容|
|action|`()`||

