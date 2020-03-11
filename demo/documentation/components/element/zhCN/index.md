# 元素 Element
Element 可以被渲染成各种标签同时还可以获得某些 `n-config-provider` 提供的配置。

## 演示
```demo
basic
color
```

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|as|`string`|`'div'`|`n-element` 需要渲染为什么元素|

## Slots
|名称|参数|说明|
|-|-|-|
|default|`(theme: string, namespace: string, themeEnvironment: any, styleScheme: object)`||

## Events
|名称|参数|
|-|-|
|theme-change|`(theme: string)`|