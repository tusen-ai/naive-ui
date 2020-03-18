# Collapse
I saw it appears in many side control panels.
## Demos
```demo
basic
accordion
nested
item-header-click
```
## V-model
|Prop|Event|
|-|-|
|expanded-names|expanded-names-change|

## Props
### Collapse
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|expanded-names|`Array`|`null`||
|accordion|`boolean`|`false`||

### Collapse Item
|Name|Type|Default|Description|
|-|-|-|-|
|title|`string \| number`|`null`||
|name|`string \| number`||**required**|

## Slots
### Collapse Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||

### Collapse Item Slots
|Name|Parameters|Description|
|-|-|-|
|default|`()`||
|header|`()`||

## Event
|Name|Parameters|Description|
|-|-|-|
|expanded-names-change|`(expandedNames: Array<string>)`||
|item-header-click|`({ name: string, expanded: boolean, event: MouseEvent })`||