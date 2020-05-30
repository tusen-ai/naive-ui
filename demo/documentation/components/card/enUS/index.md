# Card
Some amatuer UI designers like to apply shadow on every cards.
## Demos
```demo
basic
size
cover
slots
border
segment
closable
```
## Props
|Name|Type|Default|Description|
|-|-|-|-|
|title|`string`|`null`||
|content-style|`object \| string`|`null`||
|header-style|`object \| string`|`null`||
|segmented|`boolean \| { [part in 'content' \| 'footer' \| 'action']?: boolean \| 'soft' \| 'hard' }`|`false`||
|size|`'small' \| 'medium' \| 'large' \| 'huge'`|`'medium'`||
|bordered|`boolean`|`true`||
|closable|`boolean`|`false`||
|theme|`'light' \| 'dark' \| null`|`null`||
|themed-style|`{ [themeName: string]: Object } \| null`|`null`||

## Events
|Name|Parameters|Description|
|-|-|-|
|close|`()`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|cover|`()`||
|header|`()`||
|header-extra|`()`||
|default|`()`||
|footer|`()`||
|action|`()`||