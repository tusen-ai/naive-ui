# 配置消费者 Config Consumer
配置消费者的作用是获取配置提供者的（通常是全局的）配置。当你想创建一个支持主题或随主题变更内容的组件时，它十分管用。
## 演示
```demo
basic
theme-environment
color
```
## Props
|名称|参数|默认值|说明|
|-|-|-|-|
|on-theme-change|`(theme: string) => any`|`undefined`||
|on-namespace-change|`(namespace: string) => any`|`undefined`||
|on-language-change|`(language: string) => any`|`undefined`||

## Slots
|名称|参数|说明|
|-|-|-|
|default|`(options: { theme: string, namespace: string, language: string })`||