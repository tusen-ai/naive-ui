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
|Prop|Event|
|-|-|
|checked|checked-change|

## Props
### Tag
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|type|`'default' \| 'info' \| 'succcess' \| 'warning' \| 'error'`|`'default'`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|disabled|`boolean`|`false`||
|round|`boolean`|`false`||
|checkable|`boolean`|`false`||
|checked|`boolean`|`false`||
|closable|`boolean`|`false`||

### DynamicTags
|Name|Type|Default|Description|
|-|-|-|-|
|value|`array`|`[]`||
|theme|`'light' \| 'dark'`|`null`||
|type|`'default' \| 'info' \| 'succcess' \| 'warning' \| 'error'`|`'default'`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|disabled|`boolean`|`false`||
|round|`boolean`|`false`||
|closable|`boolean`|`false`||


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
|change|`(tags: array)`||