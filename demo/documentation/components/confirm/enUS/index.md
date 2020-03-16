# Confirm
Before taking action, please confirm.

## Demos
```demo
basic
async
use-component
```
## API
### $NConfirm API
|Name|Type|Description|
|-|-|-|
|warning|`(options: ConfirmOption) => ConfirmEnvironment`||
|success|`(options: ConfirmOption) => ConfirmEnvironment`||
|error|`(options: ConfirmOption) => ConfirmEnvironment`||
|destroyAll|`() => void`||

### ConfirmOption API
|Name|Type|Default|Description|
|-|-|-|-|
|type|`'error \| 'success' \| 'warning'`|`'warning'`||
|title|`string \| (() => VNode \| Array<VNode>)`|`null`|Can be a render function.|
|closable|`boolean`|`true`||
|icon|`() => VNode \| Array<VNode>`|`null`|Should be a render function.|
|negative-text|`string`|`null`|Corresponding button won't show if not set.|
|positive-text|`string`|`null`|Corresponding button won't show if not set.|
|content|`string \| (() => VNode \| Array<VNode>)`|`null`|Can be a render function.|
|show-icon|`boolean`|`true`||
|loading|`boolean`|`false`||
|bordered|`boolean`|`false`||
|onPositiveClick|`() => Promise<boolean> \| boolean`|`() => true`|The default behavior is closing the confirm. Return `false` or resolve `false` or Promise rejected will prevent the default behavior.|
|onNegativeClick|`() => Promise<boolean> \| boolean`|`() => true`|The default behavior is closing the confirm. Return `false` or resolve `false` or Promise rejected will prevent the default behavior.|
|onClose|`() => Promise<boolean> \| boolean`|`() => true`|The default behavior is closing the confirm. Return `false` or resolve `false` or Promise rejected will prevent the default behavior.|

### ConfirmEnvironment API
#### ConfirmEnvironment Properties
Properties of ConfirmEnvironment can be modified

|Name|Type|Description|
|-|-|-|
|type|`'error \| 'success' \| 'warning'`||
|title|`string \| (() => VNode \| Array<VNode>)`|Can be a render function.|
|closable|`boolean`||
|icon|`() => VNode \| Array<VNode>`|Should be a render function.|
|negative-text|`string`|Corresponding button won't show if not set.|
|positive-text|`string`|Corresponding button won't show if not set.|
|content|`string \| (() => VNode \| Array<VNode>)`|Can be a render function.|
|show-icon|`boolean`||
|loading|`boolean`||
|bordered|`boolean`||
|onPositiveClick|`() => Promise<boolean> \| boolean`||
|onNegativeClick|`() => Promise<boolean> \| boolean`||
|onClose|`() => Promise<boolean> \| boolean`||

#### ConfirmEnvironment Methods
|Name|Parameters|Description|
|-|-|-|
|hide|`()`|Call this method can close the confirm|

## Props
### Confirm Props
|Name|Type|Default|Description|
|-|-|-|-|
|type|`'error \| 'success' \| 'warning'`|`'warning'`||
|title|`string \| (() => VNode \| Array<VNode>)`|`null`|Can be a render function.|
|closable|`boolean`|`boolean`||
|icon|`() => VNode \| Array<VNode>`|`null`|Should be a render function|
|negative-text|`string`|`null`|Corresponding button won't show if not set.|
|positive-text|`string`|`null`|Corresponding button won't show if not set.|
|content|`string \| (() => VNode \| Array<VNode>)`|`null`|Can be a render function.|
|show-icon|`boolean`|`true`||
|loading|`boolean`|`false`||
|bordered|`boolean`|`false`||

## Events
### Confirm Events
|Name|Parameters|Description|
|-|-|-|
|positive-click|`()`||
|negative-click|`()`||
|close|`()`||

## Slots
### Confirm Slots
|Name|Parameters|Description|
|-|-|-|
|icon|`()`||
|header|`()`||
|default|`()`|Content|
|action|`()`||

