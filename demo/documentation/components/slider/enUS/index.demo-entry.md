# Slider
As far as I know, it is awalys used as volumn control.

## Demos
```demo
basic
range
mark
```

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|disabled|`boolean`|`false`||
|marks|`{ [markValue: number]: string }`|`undefined`||
|max|`number`|`100`||
|min|`number`|`0`||
|range|`boolean`|`false`||
|step|`number`|`1`||
|theme|`'light' \| 'dark'  \| string`|`undefined`||
|value|`number \| [number, number]`|`null`|
|on-update:value|`(value: number \| [number, number]) => any`|`undefined`||
