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
|position|`'fixed' \| 'absolute'`|`'fixed'`||
|top|`number`|`null`|The distance px to top of target to trigger top affix. (if not set, use `offset-top` prop)|
|offset-top|`number`|`null`|The css top property after trigger top affix. (if not set, use `top` prop)|
|bottom|`number`|`null`|The distance px to bottom of target to trigger bottom affix. (if not set, use `offset-bottom` prop)|
|offset-bottom|`number`|`null`|The css bottom property after trigger bottom affix. (if not set, use `bottom` prop)|
|target|`() => HTMLElement`|a function that returns the nearest scrollable ascendant element|The scrolling element to listen scrolling.|