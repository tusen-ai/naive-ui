# Dynamic Input

## Demos
```demo
basic
pair
custom
```
## Props
### Input Props
|Name|Type|Default|Description|
|-|-|-|-|
|value|`Array`||**required**|
|placeholder|`string`|`''`||
|onAdd|`(resolve: (item) => void) => any`|`null`| Callback when click at '+'. Pass resolved item to resolve function to set a new node.|

### Pair Props
|Name|Type|Default|Description|
|-|-|-|-|
|value|`Array`|-|**required**|
|placeholderKey|`string`|`key`||
|placeholderValue|`string`|`value`||
|onAdd|`(resolve: (item) => void) => any`|`null`| Callback when click at '+'. Pass resolved item to resolve function to set a new node.|


### Custom Props
|Name|Type|Default|Description|
|-|-|-|-|
|value|`Array`|-|**required**|
|onAdd|`(resolve: (item) => void) => any`|`null`| Callback when click at '+'. Pass resolved item to resolve function to set a new node.|


## Events
|Name|Parameters|Description|
|-|-|-|
|remove|`(index: Number)`| Index is the item which you removed| 