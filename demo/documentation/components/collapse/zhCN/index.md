# 折叠面板
我看到它总被用在界面边栏的控制面板上。
## 演示
```demo
basic
accordion
nested
```
## V-model
|Prop|Event|
|-|-|
|expand-names|expand-names-change|

## Props
### Collapse Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|expand-names|`Array`|`null`||
|accordion|`boolean`|`false`||

### Collapse Item Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|title|`string \| number`|`null`||
|name|`string \| number`||**必需**|

## Event
|名称|参数|介绍|
|-|-|-|
|expand-names|`(expandNames: Array<string>)`||
