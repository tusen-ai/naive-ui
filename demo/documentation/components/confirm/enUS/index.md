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
|warning|`(options: ConfirmOption) : ConfirmEnvironment`||
|success|`(options: ConfirmOption) : ConfirmEnvironment`||
|error|`(options: ConfirmOption) : ConfirmEnvironment`||
|destroyAll|`(): void`||

### ConfirmOption API
|Name|Type|Default|Description|
|-|-|-|-|
|type|`'error \| 'success' \| 'warning'`|`'warning'`||
|title|`string`|`'Confirm'`||
|closable|`boolean`|`boolean`||
|icon|`function`|`null`|Should be a render function|
|negative-text|`string \| function`|`'Cancel'`|Can be a render function|
|positive-text|`string \| function`|`'Confirm'`|Can be a render function|
|content|`string`|`null`||
|show-icon|`boolean`|`true`||
|loading|`boolean`|`false`||
|bordered|`boolean`|`false`||
|onPositiveClick|`(hide: function): any`|`hide => hide()`||
|onNegativeClick|`(hide: function): any`|`hide => hide()`|
|onClose|`(hide: function): any`|`hide => hide()`||

### ConfirmEnvironment API
#### ConfirmEnvironment Properties
Properties of ConfirmEnvironment can be modified

|Name|Type|Description|
|-|-|-|
|type|`'error \| 'success' \| 'warning'`||
|title|`string`||
|closable|`boolean`||
|icon|`function`|Should be a render function|
|negative-text|`string \| function`|Can be a render function|
|positive-text|`string \| function`|Can be a render function|
|content|`string`||
|show-icon|`boolean`||
|loading|`boolean`||
|bordered|`boolean`||
|onPositiveClick|`(hide: function): any`||
|onNegativeClick|`(hide: function): any`||
|onClose|`(hide: function): any`||

#### ConfirmEnvironment Methods
|Name|Parameters|Description|
|-|-|-|
|hide|`()`|Call this method can close the confirm|

## Props
### Confirm Props
|Name|Type|Default|Description|
|-|-|-|-|
|type|`'error \| 'success' \| 'warning'`|`'warning'`||
|title|`string`|`'Confirm'`||
|closable|`boolean`|`boolean`||
|icon|`function`|`null`|Should be a render function|
|negative-text|`string \| function`|`'Cancel'`|Can be a render function|
|positive-text|`string \| function`|`'Confirm'`|Can be a render function|
|content|`string`|`null`||
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

