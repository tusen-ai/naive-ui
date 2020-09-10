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
fallback-option
change-debug
placeholder-debug
menu-debug
```
## V-model
|prop|event|
|-|-|
|value|change|

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|clearable|`boolean`|`false`||
|debug|`boolean`|`false`|如果打开，`blur` 事件不会导致菜单关闭，方便你查看菜单的 DOM。它只会在 `process.env.NODE_ENV` 为 `'development'` 的时候生效|
|disabled|`boolean`|`false`||
|fallback-option|`false \| (value: string \| number) => SelectOption`|`value => ({ label: '' + value, value })`|在传入的选项中没有对应当前值的选项时，这个值应该对应的选项。如果设为 `false`，不会为找不到对应选项的值生成回退选项也不会显示它，未在选项中的值会被视为不合法，操作过程中会被组件清除掉|
|filter|`(pattern: string, option: Object) => boolean`|一个简单的字符串搜索算法||
|filterable|`boolean`|`false`|是否可以过滤|
|loading|`boolean`|`false`||
|multiple|`boolean`|`false`||
|on-create|`(label: string) => SelectOption`|`label => ({ label, value: label })`|在输入内容时如何创建一个选项。注意 `filter` 对这个生成的选项同样会生效。同时确保这个选项和其他选项的 `value` 不要有重复|
|options|`Array<SelectOption \| SelectOptionGroup>`|`[]`||
|placeholder|`string`|`'请选择'`||
|remote|`boolean`|`false`|是否要异步获取选项。注意如果设定了，那么 `fitler` 和 `tag` 都不会对 `options` 生效。这个时候你在全权控制 `options`|
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|tag|`boolean`|`false`|是否可以创建新的选项，需要和 `filterable` 一起使用|
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|value|`Array<string \| number> \| string \| number`|`false`||
|autofocus|`boolean`|`false`||

### SelectOption Properties
|名称|类型|说明|
|-|-|-|
|class|`string`||
|disabled|`boolean`||
|label|`string`||
|render|`Function`||
|style|`string`||
|value|`string \| number`|在选项中应该是唯一的|

### SelectOptionGroup Properties
|名称|类型|说明|
|-|-|-|
|children|`Array<SelectOption>`||
|name|`string`||
|type|`'group'`||

## Slots
|名称|参数|说明|
|-|-|-|
|action|`()`||

## Event
|名称|参数|说明|
|-|-|-|
|blur|`()`|选择器 Blur 时发出|
|change|`(value: Array \| string \| number \| null)`||
|scroll|`(e: Event)`|选择菜单在滚动|
|search|`(value: string)`||

