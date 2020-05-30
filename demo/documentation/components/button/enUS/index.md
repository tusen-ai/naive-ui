# Button
Button is used to trigger some actions.
## Demos
```demo
basic
size
text
disabled
icon
events
shape
ghost
loading
color
group
```
## Props
### Button Props
|Name|Type|Default|Description|
|-|-|-|-|
|block|`boolean`|`false`||
|circle|`boolean`|`false`||
|color|`string`|`null`|Only support `#FFF`, `#FFFFFF`, `rgb(0, 0, 0)` formatted colors.|
|disabled|`boolean`|`false`||
|ghost|`boolean`|`false`||
|icon-placement|`'left' \| 'right'`|`'left'`||
|keyboard|`boolean`|`true`|Whether is supports keyboard operation.|
|loading|`boolean`|`false`||
|round|`boolean`|`false`||
|size|`'tiny' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|text|`boolean`|`false`||
|theme|`'light' \| 'dark' \| null`|`null`||
|type|`'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'`|`'default'`||

### Button Group Props
|Name|Type|Default|Description|
|-|-|-|-|
|size|`'tiny' \| 'small' \| 'medium' \| 'large'`|`null`|The buttons' size in button group. If set, the button's size prop inner group won't work.|
|vertical|`boolean`|`false`||

## Slots
### Button Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||
|icon|`()`||

### Button Group Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||

## Events
### Button Events
|Name|Parameters|Description|
|-|-|-|
|click|`(e: MouseEvent)`||