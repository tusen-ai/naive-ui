# 配置提供者 Config Provider
配置提供者设置内部组件的主题、语言和组件卸载于其他位置的 DOM 的类名。
## 演示
```demo
theme
namespace
inherit-theme
theme-environment
language
transparent
```
## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|as|`string`|`'div'`|Config Provider 被渲染成什么元素|
|language|`string`|`en-US`|Config Provider 内部的组件语言|
|namespace|`string`|`null`|Config Provider 内部组件被卸载于其他位置的 DOM 的类名|
|theme|`string`|`null`|Config Provider 内部组件的主题|
|theme-environment|`object`|`null`|一个可以被 Config Consumer 或 Element 获取到的主题环境变量|
|transparent|`boolean`|`false`|是否不存在 DOM 包裹|

