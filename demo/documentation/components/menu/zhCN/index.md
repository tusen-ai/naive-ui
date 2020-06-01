# 菜单 Menu
没有吃的。
<!--single-column-->
## 演示
```demo
horizontal
defaultExpandedNames
indent
collapse
```

## V-model
|Prop|Event|
|-|-|
|value|select|

## Props
### Menu Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|collapsed|`boolean`|`false`|菜单是否折叠，值在菜单为垂直时有用|
|collapsed-width|`number`|`null`|折叠后菜单的宽度|
|icon-size|`number`|`20`|菜单未折叠时图标的大小|
|collapsed-icon-size|`number`|`null`|菜单折叠时图标的大小，如果为设定则使用 `icon-size` 代替|
|overlay-width|`number \| string`|`null`|弹出子菜单的宽度，只在菜单为水平或者折叠时生效|
|overlay-min-width|`number \| string`|`180`|弹出子菜单的最小宽度，只在菜单为水平或者折叠时生效|
|root-indent|`number`|`null`|菜单第一级的缩进，如果没有设定，使用 `indent` 代替|
|indent|`number`|`32`|菜单每级的缩进|
|default-expanded-names|`Array<string>`|`[]`|在非受控状态下默认展开的子菜单标识符数组|
|expandedNames|`Array<string>`|`undefined`|展开的子菜单标识符数组，如果设定了，菜单的展开将会进入受控状态，`default-expanded-names` 不会生效|
|value|`string`|`null`|菜单当前的选中值|
|mode|`'vertical' \| 'horizontal'`|`'vertical'`||

### Menu Item Props
|名称|类型|默认值|说明|
|-|-|-|-|
|title|`string`|`null`||
|title-extra|`string`|`null`||
|name|`string`||菜单项的标识符，**必需**|
|disabled|`boolean`|||

### Submenu Props
|名称|类型|默认值|说明|
|-|-|-|-|
|title|`string`|`null`||
|title-extra|`string`|`null`||
|name|`string`||子菜单的标识符，**必需**|
|disabled|`boolean`|||

### Menu Item Group Props
|名称|类型|默认值|说明|
|-|-|-|-|
|title|`string`|`null`||

## Slots
### Menu Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||

### Menu Item Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||
|extra|`()`|标题旁边的额外信息|
|icon|`()`||

### Submenu Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||
|header|`()`||
|header-extra|`()`||
|icon|`()`||

### Menu Item Group Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||
|header|`()`||

## Events
### Menu Events
|名称|参数|说明|
|-|-|-|
|select|`(selectedName: string)`||
|expanded-names-change|`(expandedNames: Array<string>)`||

