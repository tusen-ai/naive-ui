# 单选 Radio
<!--single-column-->
我还小的时候，很喜欢听收音机，比如 FM 106.8 或者 FM 92.1。
## 演示
```demo
basic
group
button-group
```
## V-model
### Radio V-model
|Prop|Event|
|-|-|
|checked-value|change|

### Radio Group V-model
|Prop|Event|
|-|-|
|value|change|

## Props
### Radio Props
|名称|类型|默认值|说明|
|-|-|-|-|
|name|`string`|`undefined`|单选 radio 元素的 name 属性。如果没有设定会使用 `radio-group` 的 `name`|
|checked-value|`string \| number \| boolean`|`null`||
|value|`string \| number \| boolean`|`null`||
|disabled|`boolean`|`false`||

### Radio Button Props
|名称|类型|默认值|说明|
|-|-|-|-|
|name|`string`|`undefined`|单选按钮 radio 元素的 name 属性。如果没有设定会使用 `radio-group` 的 `name`|
|checked-value|`string \| number \| boolean`|`null`||
|value|`string \| number \| boolean`|`null`||
|disabled|`boolean`|`false`||

### Radio Group Props
|名称|类型|默认值|说明|
|-|-|-|-|
|name|`string`|`null`|选项组内部 radio 元素的 name 属性|
|size|`'small' \| 'medium' \| 'large'`|`small`||
|value|`string \| number \| boolean`|`null`||
|disabled|`boolean`|`false`||

## Events
### Radio, Radio Button Events
|名称|参数|说明|
|-|-|-|
|change|`(checkedValue: string \| number \| boolean)`||

### Radio Group Events
|名称|参数|说明|
|-|-|-|
|change|`(checkedValue: string \| number \| boolean)`||
