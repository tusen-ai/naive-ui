# 自动填充 Auto Complete
用来当搜索提示或者类似的东西。
## 演示
```demo
basic
size
group
custom-input
after-select
```

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|blur-after-select|`boolean`|`false`||
|clear-after-select|`boolean`|`false`||
|clearable|`boolean`|`false`||
|default-value|`string`|`null`||
|disabled|`boolean`|`false`||
|options|`Array<string \| AutoCompleteOption \| AutoCompleteOptionGroup>`|`[]`||
|placeholder|`string`|`'请输入'`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|theme|`'light' \| 'dark' \| string`|`undefined`||
|value|`string`|`undefined`||
|on-blur|`(event: FocusEvent) => any`|`undefined`||
|on-focus|`(event: FocusEvent) => any`|`undefined`||
|on-select|`(value: string) => any`|`undefined`||
|on-update:value|`(value: string \| null) => any`|`undefined`||

### AutoCompleteOption Properties
|名称|类型|介绍|
|-|-|-|
|disabled|`boolean`||
|label|`string`||
|render|`Function`||
|value|`string \| number`|需要唯一|

### AutoCompleteOptionGroup Properties
|名称|类型|介绍|
|-|-|-|
|children|`Array<string \| AutoCompleteOption>`||
|name|`string`||
|type|`'group'`||

## Slots
|名称|参数|说明|
|-|-|-|
|default|`(options: { handleInput: (value: string) => any, handleFocus: function, handleBlur: function, value: string, theme: string \| null })`||
