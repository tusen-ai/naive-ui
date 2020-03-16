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
|theme|`'light' \| 'dark'`|`null`||
|themed-style|`{ [themeName: string]: object }`|`null`||
|title|`string`|`null`||
|show-icon|`string`|`true`||
|type|`'default' \| 'info' \| 'success' \| 'warning' \| 'error'`|`'default'`||
|closable|`boolean`|`false`||
|on-close|`() => Promise<boolean> \| boolean`|`() => true`||
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