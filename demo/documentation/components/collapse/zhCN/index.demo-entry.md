# 折叠面板 Collapse
我看到它总被用在界面边栏的控制面板上。
## 演示
```demo
basic
arrow-placement
accordion
nested
display-directive
item-header-click
```
## Props
### Collapse Props
|名称|类型|默认值|说明|
|-|-|-|-|
|accordion|`boolean`|`false`||
|arrow-placement|`'left' \| 'right'`|`'left'`||
|display-directive|`'if' \| 'show'`|`'if'`|内部 `n-collapse-item` 在控制内容是否渲染时使用的指令，`'if'` 对应 `v-if`，`'show'` 对应 `v-show`|
|expanded-names|`Array<string \| number>`|`null`||
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|on-update-expanded-names|`(expandedNames: Array<string>) => any`|`() => {}`||
|on-item-header-click|`(data: { name: string, expanded: boolean, event: MouseEvent }) => any`|`() => {}`||


### Collapse Item Props
|名称|类型|默认值|说明|
|-|-|-|-|
|display-directive|`'if' \| 'show' \| null`|`null`|自身在控制内容是否渲染时使用的指令，`'if'` 对应 `v-if`，`'show'` 对应 `v-show`。在设定为 `null` 的时候跟随外层的 `n-collapse`|
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
|arrow|`(options: { collapsed: boolean })`||

