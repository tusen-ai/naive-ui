# 加载 Spin
按理说它叫做 Loading 也可以，但是为啥叫 Spin 呢？因为还有一个属性更少的内部组件叫 Loading。
## 演示
```demo
basic
wrap
```
## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|spinning|`boolean`|`false`|Spin 在填入内容的状态是否激活|
|size|`'small' \| 'in-small' \| 'medium' \| 'in-medium' \| 'large' \| 'in-large'`|`medium`||
|stroke|`string`|`null`|Spin 的颜色|
|stroke-width|`number`|`null`|Spin 边缘的相对宽度，假定 Spin 的外侧半径是 100|

## Slots
|名称|参数|说明|
|-|-|-|
|default|`()`|如果填入，Spin 会包裹填入的内容|