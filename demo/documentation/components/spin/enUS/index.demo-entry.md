# Spin
It can be called loading, but why it's called loading? Because there is another internal component with less props called loading.
## Demos
```demo
basic
wrap
```
## Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|spinning|`boolean`|`false`|It spin is active|
|size|`'small' \| 'in-small' \| 'medium' \| 'in-medium' \| 'large' \| 'in-large'`|`medium`||
|stroke|`string`|`null`|Color of spin|
|stroke-width|`number`|`null`|Relative width of spin's stroke, you can assume the outer radius of spin is 100|

## Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`|If set, spin will wrap the content|