# 选择器 Select
选点啥！
## 演示
```demo
basic
size
multiple
events
filterable
remote
remote-multiple
clearable
scroll-event
group
many-options
custom-option
action
```
## V-model
|prop|event|
|-|-|
|value|change|

## Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|loading|`boolean`|`false`||
|clearable|`boolean`|`false`||
|value|`Array \| string \| number`|`false`||
|placeholder|`string`|`null`||
|multiple|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|disabled|`boolean`|`false`||
|options|`Array<SelectOption \| SelectOptionGroup>`|`[]`||
|remote|`boolearn`|`false`|是否要异步获取选项|
|filter|`(pattern: string, option: Object) => boolean`|`null`||

## API
### SelectOption Type
|属性|类型|介绍|
|-|-|-|
|label|`string`||
|value|`string \| number`|在选项中应该是唯一的|
|disabled|`boolean`||
|render|`function`||

### SelectOptionGroup Type
|属性|类型|介绍|
|-|-|-|
|type|`'group'`||
|name|`string`||
|children|`Array<SelectOption>`||

## Slots
|名称|介绍|
|-|-|
|action||

## Event
|名称|类型|介绍|
|-|-|-|
|change|`(value: Array \| string \| number \| null)`||
|search|`(value: string)`||
|blur|`()`|选择器 Blur 时发出|
|scroll|`(e: Event)`|选择菜单在滚动|

