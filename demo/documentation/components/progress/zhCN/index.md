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
height
processing
```
## Props
|名称|类型|默认值|说明|
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
|height|`number`|`null`|`'line'` 类型进度条的高度，不填写则维持默认高度|
|border-radius|`number \| string`|`null`|`'line'` 类型进度条的圆角半径，不填写则维持高度的一半|
|fill-border-radius|`number \| string`|`null`|`'line'` 类型进度条填充的圆角半径，不填写则维持 `border-radius`|
|processing|`boolean`|`false`||

## Slots
|名称|参数|说明|
|-|-|-|
|default|`()`|指示标里的内容|