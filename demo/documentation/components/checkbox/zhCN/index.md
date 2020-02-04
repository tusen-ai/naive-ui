# 复选框 Checkbox
哟，哟，Check it out。
## 演示
```demo
basic
group
grid
indeterminate
controlled
event
```
## V-model
### Checkbox V-model
|Prop|Event|
|-|-|
|change|checked|

### Checkbox Group V-model
|Prop|Event|
|-|-|
|change|value|

## Props
### Checkbox Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|value|`string \| number`|`null`||
|checked|`boolean`|`false`||
|disabled|`boolean`|`false`||

### Checkbox Group Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|value|`Array<string \| number>`|`null`||
|disabled|`boolean`|`false`||

## Slots
### Checkbox Slots
|名称|参数|介绍|
|-|-|-|
|default|`()`||

### Checkbox Group Slots
|名称|参数|介绍|
|-|-|-|
|default|`()`||

## Events
### Checkbox Events
|名称|参数|介绍|
|-|-|-|
|change|`(checked: boolean)`||

### Checkbox Group Events
|名称|参数|介绍|
|-|-|-|
|change|`(value: string \| number)`||