# Timeline
The world is 2 demensioned. One of them is time. The Other is event.
## Demos
```demo
basic
size
item-placement
```
## Props
### Timeline Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|item-placement|`'left' \| 'right'`|`'left'`||
|size|`'medium' \| 'large'`|`'medium'`||

### Timeline Item Props
|Name|Type|Default|Description|
|-|-|-|-|
|title|`string`|`null`||
|content|`string`|`null`||
|time|`string`|`null`||
|type|`'default' \| 'success' \| 'info' \| 'warning' \| 'error'`|`'default'`||

## Slots
### Timeline Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||

### Timeline Item Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||
|header|`()`||
|footer|`()`||