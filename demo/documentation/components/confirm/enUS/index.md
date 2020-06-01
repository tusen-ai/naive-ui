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
|theme|`'light' \| 'dark' \| null`|`null`||
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
|onPositiveClick|`() => boolean \| Promise<boolean> \| any`|`() => true`|The default behavior is closing the confirm. Return `false` or resolve `false` or Promise rejected will prevent the default behavior.|
|onNegativeClick|`() => boolean \| Promise<boolean> \| any`|`() => true`|The default behavior is closing the confirm. Return `false` or resolve `false` or Promise rejected will prevent the default behavior.|
|onClose|`() => boolean \| Promise<boolean> \| any`|`() => true`|The default behavior is closing the confirm. Return `false` or resolve `false` or Promise rejected will prevent the default behavior.|

### ConfirmEnvironment API
#### ConfirmEnvironment Properties
Properties of ConfirmEnvironment can be modified

|Name|Type|Description|
|-|-|-|
|theme|`'light' \| 'dark'`||
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
|onPositiveClick|`() => boolean \| Promise<boolean> \| any`||
|onNegativeClick|`() => boolean \| Promise<boolean> \| any`||
|onClose|`() => boolean \| Promise<boolean> \| any`||

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

