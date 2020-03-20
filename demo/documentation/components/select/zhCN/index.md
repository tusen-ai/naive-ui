# 选择器 Select
选点啥！
## 演示
```demo
basic
size
multiple
events
filterable
tag
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
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|loading|`boolean`|`false`||
|clearable|`boolean`|`false`||
|value|`Array \| string \| number`|`false`||
|placeholder|`string`|`'请选择'`||
|multiple|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|disabled|`boolean`|`false`||
|options|`Array<SelectOption \| SelectOptionGroup>`|`[]`||
|remote|`boolean`|`false`|是否要异步获取选项。注意如果设定了，那么 `fitler` 和 `tag` 都不会对 `options` 生效。这个时候你在全权控制 `options`|
|filterable|`boolean`|`false`|是否可以过滤|
|filter|`(pattern: string, option: Object) => boolean`|一个简单的字符串搜索算法||
|tag|`boolean`|`false`|是否可以创建新的选项，需要和 `filterable` 一起使用|
|on-create|`(label: string) => SelectOption`|`label => ({ label, value: label })`|在输入内容时如何创建一个选项。注意 `filter` 对这个生成的选项同样会生效。同时确保这个选项和其他选项的 `value` 不要有重复|

### SelectOption Properties
|名称|类型|说明|
|-|-|-|
|label|`string`||
|value|`string \| number`|在选项中应该是唯一的|
|disabled|`boolean`||
|render|`function`||

### SelectOptionGroup Properties
|名称|类型|说明|
|-|-|-|
|type|`'group'`||
|name|`string`||
|children|`Array<SelectOption>`||

## Slots
|名称|参数|说明|
|-|-|-|
|action|`()`||

## Event
|名称|参数|说明|
|-|-|-|
|change|`(value: Array \| string \| number \| null)`||
|search|`(value: string)`||
|blur|`()`|选择器 Blur 时发出|
|scroll|`(e: Event)`|选择菜单在滚动|

