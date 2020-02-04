# 进度 Progress
不知道说点啥，但是还是得写点东西，让这个页面看起来舒展一点。
## 演示
```demo
circle
line
multiple-circle
custom-indicator
color
no-indicator
```
## Props
|名称|类型|默认值|介绍|
|-|-|-|-|
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
|circle-gap|`number`|`1`|当类型是 `'multiple-circle'` 的时候圈之间的距离，假设 viewbox 的尺寸是 100|

## Slots
|名称|参数|介绍|
|-|-|-|
|default|`()`|指示标里的内容|