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
|theme|`'light' \| 'dark'`|`null`||
|marks|`{ [markValue: number]: string }`|||
|disabled|`boolean`|`false`||
|min|`number`|`0`||
|max|`number`|`100`||
|step|`number`|`1`||
|range|`boolean`|`false`||
|value|`number \| [number, number]`|`null`|

## Events
|Name|Parameters|Description|
|-|-|-|
|change|`(value: number \| [number, number])`||

