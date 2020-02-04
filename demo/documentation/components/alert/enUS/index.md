# Alert
According to my experience, the most frequent usage of it may be requesting for disabling AdBlocks.
## Demos
```demo
basic
closable
icon
no-icon
```
## Props
|Name|Type|Default|Description|
|-|-|-|-|
|title|`string`|`null`||
|show-icon|`string`|`true`||
|type|`'default' \| 'info' \| 'success' \| 'warning' \| 'error'`|`'default'`||
|closable|`boolean`|`false`||
|on-close|`(next: function) => any`|`next => next()`|Callback when close clicked. Call next to make alert close, nor it won't close|
|on-after-hide|`function`|`null`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|header|`()`||
|default|`()`||
|icon|`()`||

## Events
|Name|Parameters|Description|
|-|-|-|
|close|`()`||
|after-hide|`()`||