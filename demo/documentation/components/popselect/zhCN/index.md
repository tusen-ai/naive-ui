# 弹出选择 Popselect

如果你想选择一些数据，还不想看到那个框子，可以使用 Popselect。

## 演示
```demo
basic
cancelable
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
|value|`string \| number`|||
|options|`Array`|||
|width|`number`|||
|multiple|`boolean`|||
|cancelable|`boolean`|||
|controller|`Object`|||
|arrow|`boolean`|||
|trigger|`'click' \| 'hover' \| 'manual'`|||

## Events
|名称|参数|说明|
|-|-|-|
|change|`string \| number \| Array<string \| number> \| null`||