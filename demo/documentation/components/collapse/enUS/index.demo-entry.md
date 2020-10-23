# Collapse
I saw it appears in many side control panels.
## Demos
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
|Name|Type|Default|Description|
|-|-|-|-|
|accordion|`boolean`|`false`||
|arrow-placement|`'left' \| 'right'`|`'left'`||
|display-directive|`'if' \| 'show'`|`'if'`|The display directive to use when its inner `n-collapse-item` render content. `'if'` corresponds to `v-if` and `'show'` corresponds to `v-show`.|
|expanded-names|`Array<string \| number>`|`null`||
|theme|`'light' \| 'dark'  \| string`|`undefined`||
|on-update-expanded-names|`(expandedNames: Array<string>) => any`|`undefined`||
|on-item-header-click|`(data: { name: string, expanded: boolean, event: MouseEvent }) => any`|`undefined`||

### Collapse Item Props
|Name|Type|Default|Description|
|-|-|-|-|
|display-directive|`'if' \| 'show' \| null`|`null`|The display directive to use when it is rendering its content. `'if'` corresponds to `v-if` and `'show'` corresponds to `v-show`. When it is set to `null` the value will follow its outer `n-collapse`.|
|name|`string \| number`|required||
|title|`string`|`null`||

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
|arrow|`(options: { collapsed: boolean })`||
