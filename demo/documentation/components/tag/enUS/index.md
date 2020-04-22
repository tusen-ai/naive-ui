# Tag
Always it's for showing attribute. Sometimes it's for toggle options.
## Demos
```demo
basic
closable
disabled
size
checkable
shape
dynamicTags
```
## V-model
### Tag
|Prop|Event|
|-|-|
|checked|checked-change|

### DynamicTags
|Prop|Event|
|-|-|
|value|change|

## Props
### Tag
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|type|`'default' \| 'info' \| 'success' \| 'warning' \| 'error'`|`'default'`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|disabled|`boolean`|`false`||
|round|`boolean`|`false`||
|checkable|`boolean`|`false`||
|checked|`boolean`|`false`||
|closable|`boolean`|`false`||

### DynamicTags
|Name|Type|Default|Description|
|-|-|-|-|
|value|`Array<string>`|`[]`||
|theme|`'light' \| 'dark'`|`null`||
|type|`'default' \| 'info' \| 'success' \| 'warning' \| 'error'`|`'default'`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|disabled|`boolean`|`false`||
|round|`boolean`|`false`||
|closable|`boolean`|`false`||
|inputStyle|`object`|`{ width: '50px' }`||
|tagStyle|`object`|`{ marginRight: '5px', marginBottom: '5px' }`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||

## Events
### Tag
|Name|Parameters|Description|
|-|-|-|
|close|`()`|
|checked-change|`(checked: boolean)`||

### DynamicTags
|Name|Parameters|Description|
|-|-|-|
|change|`(tags: Array<string>)`||