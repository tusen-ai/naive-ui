# Slider
As far as I know, it is awalys used as volumn control.
## Demos
```demo
basic
range
mark
```
## V-model
|Prop|Event|
|-|-|
|value|change|

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|marks|`object`||Looks like `{ value: label, ...}`|
|disabled|`boolean`|`false`||
|min|`number`|`0`||
|max|`number`|`100`||
|step|`number`|`1`||
|range|`boolean`|`false`||
|value|`number \| Array<number>`|`null`|

## Events
|Name|Parameters|Description|
|-|-|-|
|change|`(value)`||

