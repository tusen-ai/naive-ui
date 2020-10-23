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
|bordered|`boolean`|`true`||
|closable|`boolean`|`false`||
|content-style|`Object \| string`|`undefined`||
|header-style|`Object \| string`|`undefined`||
|segmented|`boolean \| { [part in 'content' \| 'footer' \| 'action']?: boolean \| 'soft' \| 'hard' }`|`false`||
|size|`'small' \| 'medium' \| 'large' \| 'huge'`|`'medium'`||
|themed-style|`{ [themeName: string]: Object }`|`undefined`||
|theme|`'light' \| 'dark'  \| string`|`undefined`||
|title|`string`|`undefined`||
|on-close|`() => any`|`undefined`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|cover|`()`||
|header|`()`||
|header-extra|`()`||
|default|`()`||
|footer|`()`||
|action|`()`||