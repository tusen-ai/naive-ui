# Confirm
Before taking action, please confirm.

## Demos
```demo
basic
async
use-component
```
## API
### $NConfirm
|Method|Description|
|-|-|
|`open(options: ConfirmOption) : ConfirmEnvironment`||
|`success(options: ConfirmOption) : ConfirmEnvironment`||
|`error(options: ConfirmOption) : ConfirmEnvironment`||
|`destroyAll()`||

### ConfirmOption
See following Confirm Props.

### ConfirmEnvironment
Property of ConfirmEnvironment can be modified or called.

|Property|Type|Description|
|-|-|-|
|onPositiveClick|`(hide: function): any`||
|onNegativeClick|`(hide: function): any`||
|onClose|`(hide: function): any`||
|...||See following Confirm Props|

## Props
### Confirm Props
|Name|Type|Default|Description|
|-|-|-|-|
|type|`'error \| 'success' \| 'warning'`|`'warning'`||
|title|`string`|`'Confirm'`||
|closable|`boolean`|`boolean`||
|negative-text|`string`|`'Cancel'`||
|positive-test|`string`|`null`||
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
|footer|`()`||

