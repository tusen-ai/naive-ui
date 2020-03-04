# 弹出选择 Popselect

如果你想选择一些数据，还不想看到那个框子，可以使用 Popselect。

## 演示
```demo
basic
size
scrollable
custom-width
multiple
```
## V-model
|Prop|Event|
|-|-|
|value|change|

## Props

|名称|类型|默认值|说明|
|-|-|-|-|
|value|`string \| number`|`null`||
|options|`Array<SelectOption \| SelectOptionGroup>`|`[]`||
|scrollable|`boolean`|`true`||
|multiple|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'small'`||

对于 SelectOption & SelectOptionGroup，参考 [Select](n-select#SelectOption-Type)

对于其他 props，参考 [Popover](n-popover#Props)

## Events
|名称|参数|说明|
|-|-|-|
|change|`string \| number \| Array<string \| number> \| null`||