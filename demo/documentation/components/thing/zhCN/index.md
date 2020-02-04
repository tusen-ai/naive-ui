# 东西 Thing
当你想要描述一个东西，使用 Thing。如果你觉得这个组件不能满足你的需求，可以自己写一个。

我其实很想把所有常用的布局都撞到一个组件里，我想了很久，感觉这个组件确实已经存在了，那就是浏览器本身。
## 演示
```demo
basic
indent
```
## Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|title|`string`|`null`||
|title-extra|`string`|`null`||
|description|`string`|`null`||
|content|`string`|`null`||
|content-indented|`boolean`|`false`||

## Slots
|名称|参数|介绍|
|-|-|-|
|header|`()`||
|header-extra|`()`||
|description|`()`||
|default|`()`||
|action|`()`||