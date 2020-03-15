# 自定义增加

## 演示
```demo
basic
pair
custom
```
## Props
### Input Props
|名称|类型|默认值|说明|
|-|-|-|-|
|value|`Array`||**必需**|
|placeholder|`string`|`''`||
|onAdd|`(resolve: (item) => void) => any`|`null`| 点击 '+' 时的回调.将要增加的一条数据传入resolve方法，用来新增一个节点.|

### Pair Props
|名称|类型|默认值|说明|
|-|-|-|-|
|value|`Array`||**必需**|
|placeholderKey|`string`|`key`||
|placeholderValue|`string`|`value`||
|onAdd|`(resolve: (item) => void) => any`|`null`| 点击 '+' 时的回调.将要增加的一条数据传入resolve方法，用来新增一个节点.|


### Custom Props
|名称|类型|默认值|说明|
|-|-|-|-|
|value|`Array`||**必需**|
|onAdd|`(resolve: (item) => void) => any`|`null`| 点击 '+' 时的回调.将要增加的一条数据传入resolve方法，用来新增一个节点.|


## Events
|名称|参数|说明|
|-|-|-|
|remove|`(index: Number)`| Index 是要移除的数据的索引| 