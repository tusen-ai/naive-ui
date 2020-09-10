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
|closable|`boolean`|`false`||
|on-close|`() => boolean \| Promise<boolean> \| any`|`() => true`||
|on-after-hide|`Function`|`null`||
|show-icon|`boolean`|`true`||
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|themed-style|`{ [themeName: string]: Object } \| null`|`null`||
|title|`string`|`null`||
|type|`'default' \| 'info' \| 'success' \| 'warning' \| 'error'`|`'default'`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||
|header|`()`||
|icon|`()`||

## Events
|Name|Parameters|Description|
|-|-|-|
|after-leave|`()`|When close transition is done|
|leave|`()`|When you click close.|