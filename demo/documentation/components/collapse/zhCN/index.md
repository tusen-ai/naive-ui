# 折叠面板 Collapse
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
|expanded-names|expanded-names-change|

## Props
### Collapse Props
|名称|类型|默认值|说明|
|-|-|-|-|
|expanded-names|`Array`|`null`||
|accordion|`boolean`|`false`||

### Collapse Item Props
|名称|类型|默认值|说明|
|-|-|-|-|
|title|`string \| number`|`null`||
|name|`string \| number`||**必需**|

## Slots
### Collapse Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||

### Collapse Item Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||


## Event
|名称|参数|说明|
|-|-|-|
|expanded-names|`(expandedNames: Array<string>)`||
