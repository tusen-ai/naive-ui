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
|options|`Array`|`[]`||
|blur-after-select|`boolean`|`false`||
|clear-after-select|`boolean`|`false`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|default|`({ handleInput, handleFocus, handleBlur, value })`||

## Events
|Name|Parameters|Description}
|-|-|-|
|input|`(value)`||
|select|`(value)`||
