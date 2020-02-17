# Popover

Pop some hidden message around content. There isn't much builtin styles in popover. It's more up to you to fill the content.

If you just want to display some basic text message, see [Tooltip](n-tooltip) instead.

## Demos

```demo
basic
delay
no-arrow
trigger
event
placement
raw-content
width
manual-position
```

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|trigger|`'hover' \| 'trigger' \| 'manual'`|`'hover'`||
|delay|`number`|`0`||
|duration|`number`|`300`||
|placement|`'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end' \| `|`'bottom'`||
|arrow|`boolean`|`false`||
|raw|`boolean`|`false`||
|disabled|`boolean`|`false`||
|manuallyPositioned|`boolean`|`false`||
|x|`number`|`null`||
|y|`number`|`null`||
|filp|`boolean`|`true`||
|controller|`object`|`null`||
|overlay-class|`string`|`null`||
|overlay-style|`object`|`null`||

## Events
|Name|Parameters|
|-|-|
|show|`()`|
|hide|`()`|