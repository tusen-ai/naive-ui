# Anchor
<!--single-column-->

## Demos
```demo
basic
affix
scrollto
```
## Props
|Name|Type|Default|Description|
|-|-|-|-|
|affix|`boolean`|`false`|If it works like a affix. If set to `true`, it will recieve props from [affix](n-affix#Props)|
|target|`() => HTMLElement`|A function that returns the nearest scrollable ascendant element|The element that anchor listens to scroll event.|
|bound|`number`|`12`||

## Methods
|Method|Description|
|-|-|
|`scrollTo(href: string)`||