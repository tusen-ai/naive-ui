# Dropdown
When you have some functions to trigger.

## Demos
```demo
basic
trigger
cascade
placement
width
size
manual-position
```

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|size|`'small'\|'medium'\|'large'\|'huge'`|`large`||
|options|`Array`|`[]`||
|keyboard|`boolean`|`true`|Whether is supports keyboard operation. (Be careful about the potential conflicts with other components keyboard operations)|
|submenu-width|`number`|`null`||
|submenu-min-width|`number`|`null`||

For other props, see [Popover Props](n-popover#Props). Note that `arrow`, `raw` is not available.

### DropdownOption Type
|Property|Type|Description|
|-|-|-|
|label|`string`||
|value|`string \| number`|Should be unique|

### DropdownDivider Type
|Property|Type|Description|
|-|-|-|
|type|`'divider'`||

### DropdownSubmenu Type
|Property|Type|Description|
|-|-|-|
|label|`string`||
|value|`string \| number`|Should be unique|
|children|`Array<DropdownOption \| DropdownDivider \| DropdownSubmenu>`||

## Events
|Name|Parameters|Description|
|-|-|-|
|select|`(selectedValue: string \| number)`||





