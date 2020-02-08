# Drawer
I think it is similar with modal, with a bit difference on placement.
## Demos
```demo
basic
multiple
```
## V-model
|prop|event|
|-|-|
|show|hide|

## Props
|Name|Parameters|Default|Description|
|-|-|-|-|
|show|`boolean`|`false`||
|placement|`'top' \| 'right' \| 'bottom' \| 'left'`|`'right'`||
|width|`number`|`251`||
|height|`number`|`251`|Works when placement is `top` and `bottom`.|
|mask-closable|`boolean`|`true`|Whether to emit `hide` event when click mask.|
|drawer-style|`object`|`null`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||

## Events
|Name|Parameters|Description|
|-|-|-|
|show|`()`||
|hide|`(show: false)`||