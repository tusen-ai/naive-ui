# Popselect

If you want select some options but don't want a picker, you can use popselect instead.

## Demos
```demo
basic
size
scrollable
custom-width
multiple
```

## V-model
|Prop|Event|
|-|-|
|value|change|

## Props

|Name|Type|Default|Description|
|-|-|-|-|
|value|`string \| number`|`null`||
|options|`Array<SelectOption \| SelectOptionGroup>`|`[]`||
|scrollable|`boolean`|`true`||
|multiple|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'small'`||

For SelectOption & SelectOptionGroup, see [Select](n-select#SelectOption-Type)

For other props, see [Popover](n-popover#Props)

## Events
|Name|Parameters|Description|
|-|-|-|
|change|`string \| number \| Array<string \| number> \| null`||