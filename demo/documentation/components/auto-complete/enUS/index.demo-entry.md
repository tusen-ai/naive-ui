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

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|blur-after-select|`boolean`|`false`||
|clear-after-select|`boolean`|`false`||
|options|`Array<string \| AutoCompleteOption \| AutoCompleteOptionGroup>`|`[]`||
|placeholder|`string`|`null`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|theme|`'light' \| 'dark' \| string`|`undefined`||
|value|`string`|`null`||
|on-blur|`(event: FocusEvent) => any`|`undefined`||
|on-focus|`(event: FocusEvent) => any`|`undefined`||
|on-select|`(value: string) => any`|`undefined`||
|on-update:value|`(value: string \| null) => any`|`undefined`||

### AutoCompleteOption Properties
|Name|Type|Description|
|-|-|-|
|disabled|`boolean`||
|label|`string`||
|render|`Function`||
|value|`string \| number`|Should be unique in options.|

### AutoCompleteOptionGroup Properties
|Name|Type|Description|
|-|-|-|
|children|`Array<string | AutoCompleteOption>`||
|name|`string`||
|type|`'group'`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|default|`(options: { handleInput: (value: string) => any, handleFocus: function, handleBlur: function, value: string, theme: string \| null })`||
