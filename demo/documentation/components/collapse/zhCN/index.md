# 折叠面板 Collapse
我看到它总被用在界面边栏的控制面板上。
## 演示
```demo
basic
arrow-placement
accordion
nested
item-header-click
```
## V-model
|Prop|Event|
|-|-|
|expanded-names|expanded-names-change|

## Props
### Collapse Props
|名称|类型|默认值|说明|
|-|-|-|-|
|accordion|`boolean`|`false`||
|arrow-placement|`'left' \| 'right'`|`'left'`||
|expanded-names|`Array<string \| number>`|`null`||
|theme|`'light' \| 'dark'`|`null`||


### Collapse Item Props
|名称|类型|默认值|说明|
|-|-|-|-|
|name|`string \| number`||**必需**|
|title|`string`|`null`||

## Slots
### Collapse Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||

### Collapse Item Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||
|header|`()`||
|arrow|`({ collapsed: boolean })`||

## Event
### Collapse Event
|名称|参数|说明|
|-|-|-|
|expanded-names-change|`(expandedNames: Array<string>)`||
|item-header-click|`({ name: string, expanded: boolean, event: MouseEvent })`||
