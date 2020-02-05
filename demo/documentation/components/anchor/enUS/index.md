# Anchor
<!--single-column-->
These demos used to use some charactor names from *Hard-Boiled Wonderland and the End of the World* as anchor links, but if so there will be too wired in this page compared with other pages. So I rewrite them. What a pity.
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
|target|`() => HTMLElement`|A function that returns the nearest scrollable ascendant element|The element that anchor listens to scroll event. (If you want affix & anchor to listen to different target, manually warp anchor in affix instead.)|
|bound|`number`|`12`||

## Methods
|Name|Type|Description|
|-|-|-|
|scrollTo|`(href: string) => void`||