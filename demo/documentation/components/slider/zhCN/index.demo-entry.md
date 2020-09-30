# 滑动选择 Slider
就我所知，这东西一般就用来控制音量。

## 演示
```demo
basic
range
mark
```

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|marks|`{ [markValue: number]: string }`|`undefined`||
|disabled|`boolean`|`false`||
|min|`number`|`0`||
|max|`number`|`100`||
|step|`number`|`1`||
|range|`boolean`|`false`||
|value|`number \| [number, number]`|`null`|
|on-update:value|`(value: number \| [number, number]) => any`|`undefined`||
