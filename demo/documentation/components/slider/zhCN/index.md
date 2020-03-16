# 滑动选择 Slider
就我所知，这东西一般就用来控制音量。

## 演示
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
|名称|类型|默认值|说明|
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
|名称|参数|说明|
|-|-|-|
|change|`(value: number \| [number, number])`||

