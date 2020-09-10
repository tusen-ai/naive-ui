# Menu
<!--single-column-->
No Food.
## Demos
```demo
horizontal
default-expanded-names
indent
collapse
```

## V-model
|Prop|Event|
|-|-|
|value|select|

## Props
### Menu Props
|Name|Type|Default|Description|
|-|-|-|-|
|collapsed|`boolean`|`false`|The collapsed status of menu, only works when menu is vertical.|
|collapsed-icon-size|`number`|`null`|The icon size when menu is collapsed. If not set, menu will use `icon-size` in place of it.|
|collapsed-width|`number`|`null`|The menu width after collapsed.|
|default-expanded-names|`Array<string>`|`[]`|The default expanded submenu names of menu in uncontrolled manner.|
|expandedNames|`Array<string>`|`undefined`|The expanded submenu names. If set, menu will work in controlled manner and `default-expanded-names` won't work.|
|items|`Array<MenuItem \| Submenu \| MenuItemGroup>`|`[]`|Items data of menu.|
|icon-size|`number`|`20`|The icon size when menu is not collapsed.|
|indent|`number`|`32`|The indend of menu|
|mode|`'vertical' \| 'horizontal'`|`'vertical'`||
|overlay-min-width|`number \| string`|`180`|The min width of submenu popover. Works when menu is horizontal or collapsed.|
|overlay-width|`number \| string`|`null`|The width of submenu popover. Works when menu is horizontal or collapsed.|
|root-indent|`number`|`null`|The indent of menu's first level children. If not set, menu will use `indent` in place of it.|
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|value|`string`|`null`|The selected name of menu.|

### MenuItem Properties
|Name|Type|Description|
|-|-|-|
|disabled|`boolean`||
|icon|`(h: createElement) => VNode`||
|name|`string`|The indentifier of the menu item. **required**|
|title|`string`||
|title-extra|`string`||

### Submenu Properties
|Name|Type|Description|
|-|-|-|
|children|`Array<MenuItem \| Submenu \| MenuItemGroup>`|**required**|
|disabled|`boolean`||
|icon|`(h: createElement) => VNode`||
|name|`string`|The indentifier of the submenu. **required**|
|title|`string`||
|title-extra|`string`||
|type|`'submenu'`|**required**|

### MenuItemGroup Properties
|Name|Type|Description|
|-|-|-|
|children|`Array<MenuItem \| Submenu \| MenuItemGroup>`|**required**|
|title|`string`||
|type|`'group'`|**required**|

## Events
### Menu Events
|Name|Parameters|Description|
|-|-|-|
|expanded-names-change|`(expandedNames: Array<string>)`||
|select|`(selectedName: string)`||
