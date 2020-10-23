# 侧边导航 Anchor
<!--single-column-->
下面的演示曾经用的是《世界尽头与冷酷仙境》的一些角色名称作为 Anchor 的子标题，但是这样的话和其他页面差的就有点远了。所以最后还是重写了这个页面，表示遗憾。
## 演示
```demo
basic
ignore-gap
affix
scrollto
```
## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|affix|`boolean`|`false`|Anchor 是否像 Affix 一样展示，如果设定为 `true`，它还会接受 [Affix](n-affix#Props) 的 Props|
|bound|`number`|`12`||
|ignore-gap|`boolean`|`false`| 如果设定为 `true`, 导航将显示在准确的href区域 |
|listen-to|`string \| HTMLElement`|`undefined`|需要监听滚动的元素，如果未设定则会监听最近的可滚动祖先元素|
|theme|`'light' \| 'dark' \| string`|`undefined`||

## Methods
|名称|类型|说明|
|-|-|-|
|scrollTo|`(href: string) => void`||