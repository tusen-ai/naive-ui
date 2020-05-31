# Popover

Pop some hidden message around content. There isn't much builtin styles in popover. It's more up to you to fill the content.

If you just want to display some basic text message, see [Tooltip](n-tooltip) instead.

## Demos

```demo
basic
trigger
controller
delay
no-arrow
event
placement
raw-content
width
manual-position
```

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|trigger|`'hover' \| 'trigger' \| 'manual'`|`'hover'`||
|show|`boolean`|`false`|Whether to show popover when trigger is `manual`|
|delay|`number`|`0`|Popover showing delay when trigger is `hover`|
|duration|`number`|`300`|Popover vanish delay when trigger is `hover`|
|placement|`'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end' \| `|`'bottom'`||
|show-arrow|`boolean`|`true`||
|raw|`boolean`|`false`|Whether to use no default styles.|
|disabled|`boolean`|`false`|Whether the popover can't be activated.|
|filp|`boolean`|`true`|Whether to filp the popover when there is no space for current placement.|
|controller|`Object`|`null`|The controller object of `n-popover`. If a object is passed in, `show` and `hide` methods will be added to the object. The methods can controlled the display status of the popover when not `manual` triggered.|
|overlay-class|`string`|`null`||
|overlay-style|`Object`|`null`||
|arrow-style|`Object`|`null`||
|display-directive|`'if' \| 'show'`|`'if'`|The conditionally render directive to show popover content. `if` means using `v-if` to render content, `show` means using `v-show` to render content.|
|manually-positioned|`boolean`|`false`|Whether to manually position the popover.|
|x|`number`|`null`|The CSS `left` pixel value when popover manually positioned.|
|y|`number`|`null`|The CSS `top` pixel value when popover manually positioned.|
|width|`number \| string`|`null`||
|min-width|`number \| string`|`null`||
|max-width|`number \| string`|`null`||

## Slots
|Name|Parameters|Description|
|-|-|-|
|activator|`()`|The element or component that triggers popover.|
|default|`()`|The content inside popover.|


## Events
|Name|Parameters|Description|
|-|-|-|
|show|`()`||
|hide|`()`||