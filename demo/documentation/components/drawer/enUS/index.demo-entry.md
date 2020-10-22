# Drawer
I think it is similar with modal, with a bit difference on placement.

## Demos
```demo
basic
multiple
target
```

## Props
|Name|Parameters|Default|Description|
|-|-|-|-|
|body-class|`string`|`undefined`||
|body-style|`Object`|`undefined`||
|body-wrapper-class|`string`|`undefined`||
|body-wrapper-style|`Object`|`undefined`||
|height|`number \| string`|`251`|Works when placement is `top` and `bottom`.|
|mask-closable|`boolean`|`true`|Whether to emit `hide` event when click mask.|
|placement|`'top' \| 'right' \| 'bottom' \| 'left'`|`'right'`||
|show|`boolean`|`false`||
|themed-style|`{ [themeName: string]: Object } \| null`|`null`||
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|to|`string \| HTMLElement`|`'body'`|Container node of the drawer.|
|width|`number \| string`|`251`||
|on-update:show|`(show: boolean) => any`|`undefined`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||
