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
```
## V-model
|Prop|Event|
|-|-|
|checked|checked-change|

## Props
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

## Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||

## Events
|Name|Parameters|Description|
|-|-|-|
|close|`()`|
|checked-change|`(checked: boolean)`||