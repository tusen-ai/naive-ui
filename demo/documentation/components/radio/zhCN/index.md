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
|checked-value|`string \| number \| boolean`|`null`||
|value|`string \| number \| boolean`|`null`||
|disabled|`boolean`|`false`||

### Radio Button Props
|名称|类型|默认值|说明|
|-|-|-|-|
|checked-value|`string \| number \| boolean`|`null`||
|value|`string \| number \| boolean`|`null`||
|disabled|`boolean`|`false`||

### Radio Group Props
|名称|类型|默认值|说明|
|-|-|-|-|
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
