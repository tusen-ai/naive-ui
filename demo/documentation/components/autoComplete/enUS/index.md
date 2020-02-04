# Auto Complete
Use as search hint or something similar.
## Demos
```demo
basic
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
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|value|`string`|`null`||
|options|`Array<AutoCompleteOption \| AutoCompleteOptionGroup>`|`[]`||
|placeholder|`string`|`null`||
|blur-after-select|`boolean`|`false`||
|clear-after-select|`boolean`|`false`||

## API
### AutoCompleteOption Type
|Property|Type|Description|
|-|-|-|
|label|`string`||
|value|`string \| number`|Should be unique in options.|
|disabled|`boolean`||
|render|`function`||

### AutoCompleteOptionGroup Type
|Property|Type|Description|
|-|-|-|
|type|`'group'`||
|name|`string`||
|children|`Array<AutoCompleteOption>`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|default|`({ handleInput: (value: string) : any, handleFocus: function, handleBlur: function, value: string })`||

## Events
|Name|Parameters|Description|
|-|-|-|
|input|`(value: string \| null)`||
|select|`(value: string)`||
