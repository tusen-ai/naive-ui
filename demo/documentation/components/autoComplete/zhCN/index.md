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

## V-model
|Prop|Event|
|-|-|
|value|input|

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|value|`string`|`null`||
|options|`Array<string \| AutoCompleteOption \| AutoCompleteOptionGroup>`|`[]`||
|placeholder|`string`|`null`||
|blur-after-select|`boolean`|`false`||
|clear-after-select|`boolean`|`false`||

### AutoCompleteOption Type
|属性|类型|介绍|
|-|-|-|
|label|`string`||
|value|`string \| number`|Should be unique in options.|
|disabled|`boolean`||
|render|`function`||

### AutoCompleteOptionGroup Type
|属性|类型|介绍|
|-|-|-|
|type|`'group'`||
|name|`string`||
|children|`Array<string | AutoCompleteOption>`||

## Slots
|名称|参数|说明|
|-|-|-|
|default|`({ handleInput: (value: string) => any, handleFocus: function, handleBlur: function, value: string, theme: string \| null })`||

## Events
|名称|参数|说明|
|-|-|-|
|input|`(value: string \| null)`||
|select|`(value: string)`||
