# Drawer
I think it is similar with modal, with a bit difference on placement.
## Demos
```demo
basic
multiple
target
```
## V-model
|prop|event|
|-|-|
|show|hide|

## Props
|Name|Parameters|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|themed-style|`{ [themeName: string]: Object } \| null`|`null`||
|show|`boolean`|`false`||
|placement|`'top' \| 'right' \| 'bottom' \| 'left'`|`'right'`||
|width|`number \| string`|`251`||
|height|`number \| string`|`251`|Works when placement is `top` and `bottom`.|
|mask-closable|`boolean`|`true`|Whether to emit `hide` event when click mask.|
|drawer-style|`Object`|`null`||
|target|`() => HTMLElement`|`() => document.body`|The area where the drawer appears.|
|drawer-class|`string`|`null`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||

## Events
|Name|Parameters|Description|
|-|-|-|
|show|`()`||
|hide|`(show: false)`||