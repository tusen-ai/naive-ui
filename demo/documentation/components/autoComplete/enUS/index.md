# Auto Complete
Use as search hint or something similar.
## Demos
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
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|value|`string`|`null`||
|options|`Array<string \| AutoCompleteOption \| AutoCompleteOptionGroup>`|`[]`||
|placeholder|`string`|`null`||
|blur-after-select|`boolean`|`false`||
|clear-after-select|`boolean`|`false`||

### AutoCompleteOption Properties
|Name|Type|Description|
|-|-|-|
|label|`string`||
|value|`string \| number`|Should be unique in options.|
|disabled|`boolean`||
|render|`function`||

### AutoCompleteOptionGroup Properties
|Name|Type|Description|
|-|-|-|
|type|`'group'`||
|name|`string`||
|children|`Array<string | AutoCompleteOption>`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|default|`({ handleInput: (value: string) => any, handleFocus: function, handleBlur: function, value: string, theme: string \| null })`||

## Events
|Name|Parameters|Description|
|-|-|-|
|input|`(value: string \| null)`||
|select|`(value: string)`||
