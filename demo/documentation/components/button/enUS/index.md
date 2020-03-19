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
group
debug
```
## Props
### Button Props
|Name|Type|Default|Description|
|-|-|-|-|
|size|`'tiny' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|type|`'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'`|`'default'`||
|text|`boolean`|`false`||
|block|`boolean`|`false`||
|ghost|`boolean`|`false`||
|disabled|`boolean`|`false`||
|circle|`boolean`|`false`||
|round|`boolean`|`false`||
|loading|`boolean`|`false`||
|keyboard|`boolean`|`true`|Whether is supports keyboard operation.|
|icon-placement|`'left' \| 'right'`|`'left'`||
|theme|`'light' \| 'dark'`|`null`||

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