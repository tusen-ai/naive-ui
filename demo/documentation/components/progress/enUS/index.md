# Progress
I have no words to say but there still should be a placeholder to make layout looks spread.
## Demos
```demo
circle
line
multiple-circle
custom-indicator
color
no-indicator
height
processing
```
## Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|processing|`boolean`|`false`||
|type|`'line' \| 'circle' \| 'multiple-circle'`|`line`||
|status|`'default' \| 'success' \| 'error' \| 'warning' \| 'info'`|`'default'`||
|rail-color|`string \| Array<string>`|`null`||
|color|`string \| Array<string>`|`null`||
|stroke-width|`number`|`7`||
|percentage|`number \| Array<number>`|`0`||
|unit|`string`|`%`||
|show-indicator|`boolean`|`true`||
|indicator-placement|`'inside' \| 'inside-label' \| 'outside'`|`'outside'`||
|indicator-text-color|`string`|`null`||
|circle-gap|`number`|`1`|The gap bewteen circles when type is `'multiple-circle'`, suppose viewbox size is `100`|
|height|`number`|`null`|`'line'` typed progress's height. Keep default height if not passed.|
|border-radius|`number \| string`|`null`|`'line'` typed progress's border-radius. Keep half of default height if not passed.|
|fill-border-radius|`number \| string`|`null`|`'line'` typed progress's fill's border-radius. Keep `border-radius` if not passed.|
|processing|`boolean`|`false`||


## Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`|Content will replace default indicatior content|