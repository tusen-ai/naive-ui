# 标签页 Tabs
在同一块区域切换内容。
## 演示
```demo
basic
flex-label
card
display-directive
line-debug
```
## V-model
|Prop|Event|
|-|-|
|active-name|active-name-change|

## Props
### Tabs Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|active-name|`string \| number`|`null`||
|type|`'line' \| 'card'`|`'line'`||
|closable|`boolean`|`false`||
|justify-content|`'space-between' \| 'space-around' \| 'space-evenly'`|`null`||
|label-size|`'small' \| 'medium' \| 'large' \| 'huge'`|`'medium'`|标签的尺寸，只对线型的 Tabs 生效|

### Tab Pane Props
|名称|类型|默认值|说明|
|-|-|-|-|
|label|`string`|`null`||
|name|`string \| number`|`null`|**必需**|
|disabled|`boolean`|`false`||
|display-directive|`'if' \| 'show'`|`'if'`|选择性渲染使用的指令。if 对应 v-if，show 对应 v-show，使用 show 的时候标签页状态切换后不会被重置|

## Slots
### Tabs, Tab Pane Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||

## Events
|名称|参数|说明|
|-|-|-|
|active-name-change|`(activeName: string \| number)`||