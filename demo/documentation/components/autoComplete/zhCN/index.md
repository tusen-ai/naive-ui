# 自动填充 Auto Complete
用来当搜索提示或者类似的东西。
## 演示
```demo
basic
size
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
|options|`Array<AutoCompleteOption \| AutoCompleteOptionGroup>`|`[]`||
|placeholder|`string`|`null`||
|blur-after-select|`boolean`|`false`||
|clear-after-select|`boolean`|`false`||

## Slots
|名称|参数|说明|
|-|-|-|
|default|`({ handleInput: (value: string) => any, handleFocus: function, handleBlur: function, value: string, theme: string \| null })`||

## Events
|名称|参数|说明|
|-|-|-|
|input|`(value: string \| null)`||
|select|`(value: string)`||
