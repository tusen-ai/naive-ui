# Button
Button is used to trigger some actions.
## Demos
```demo
basic
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
|size|`'small' \| 'medium' \| 'large'`|`'medium'`
|type|`'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'`|`'default'`||
|text|`boolean`|`false`||
|ghost|`boolean`|`false`||
|disabled|`boolean`|`false`||
|circle|`boolean`|`false`||
|round|`boolean`|`false`||
|loading|`boolean`|`false`||
|icon-placement|`'left' \| 'right'`|`'left'`||

### Button Group Props
|Name|Type|Default|Description|
|-|-|-|-|
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