# 动态录入 Dynamic Input
<!--single-column-->
这个组件的名字改过很多次。

一开始它被造出来是为了输入环境变量。
## 演示
```demo
basic
pair
custom
form
```
## Props
### Dynamic Input Props
|名称|类型|默认值|说明|
|-|-|-|-|
|preset|`'input' \| 'preset'`|`'input'`|动态录入使用的预设，在不设定 `$scopedSlots.default` 的时候生效。|
|value|`Array`|-|**必需**|
|max|`number`|`null`|最多有几项内容|
|key-field|`string`|`null`||
|on-create|`(index: number) => any`|`null`|点击添加按钮时的回调，如果设定则返回值会被用作新添加的初始值。其中 `index` 是创建内容将要被放置到的位置，从 1 (第二项)开始计算。|
|on-clear|`() => any`|`null`|点击清空最后一项时的回调，如果设定则返回值会被用作为最后一项清空后的值, 如果是自定义地内容并且没有设定返回值，最后一项不允许被清空，删除按钮不可点击。|

### Dynamic Input Props(Input Preset)
|名称|类型|默认值|说明|
|-|-|-|-|
|value|`Array<string>`|-|**必需**|
|placeholder|`string`|`''`||

### Dynamic Input Props(Pair Preset)
|名称|类型|默认值|说明|
|-|-|-|-|
|value|`Array<{ key: string, value: string }>`|-|**必需**|
|key-placeholder|`string`|`''`||
|value-placeholder|`string`|`''`||

## Slots
|名称|参数|说明|
|-|-|-|
|default|`({ value: any, index: number })`|每一项的渲染方式，其中 `value` 为该项对应的数组值，`index` 为该项对应的数组索引|

## Events
|名称|参数|说明|
|-|-|-|
|create|`(index: Number)`|`index` 是新增的数据的索引|
|clear|`()`||
|remove|`(index: Number)`|`index` 是被移除的数据的索引| 