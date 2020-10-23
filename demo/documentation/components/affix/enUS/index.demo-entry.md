# Affix
Affix can make content stick to fixed places when scrolling. It's similar to `position: sticky` but can do more things.
## Demos
```demo
basic
position
```
## Props
|Name|Type|Default|Description|
|-|-|-|-|
|bottom|`number`|`undefined`|The css bottom property after trigger bottom affix. (if not set, use `offset-bottom` prop)|
|listen-to|`string \| HTMLElement`|`undefined`|The scrolling element to listen scrolling. If not set it will listen to the nearest scrollable ascendant element.|
|offset-bottom|`number`|`undefined`|The distance px to bottom of target to trigger bottom affix. (if not set, use `bottom` prop)|
|offset-top|`number`|`undefined`|The distance px to top of target to trigger top affix. (if not set, use `top` prop)|
|position|`'fixed' \| 'absolute'`|`'fixed'`||
|top|`number`|`undefined`|The css top property after trigger top affix. (if not set, use `offset-top` prop)|