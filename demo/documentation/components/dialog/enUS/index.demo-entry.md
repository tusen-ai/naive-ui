# Dialog
Before taking action, please confirm.

<n-space vertical>
<n-alert title="Prerequisite" type="warning">
  If you want use dialog, you need to wrap the component where you call related methods inside <n-text code>n-dialog-provider</n-text> and inject <n-text code>dialog</n-text>.
</n-alert>
For example:

```html
<!-- App.vue -->
<n-dialog-provider>
  <content />
</n-dialog-provider>
```

```js
// content
export default {
  inject: ['dialog'],
  methods: {
    warning () {
      this.dialog.warning(
        // ...
      )
    }
  }
}
```
</n-space>

## Demos
```demo
basic
async
use-component
```
## API
### `dialog` Injection API
|Name|Type|Description|
|-|-|-|
|destroyAll|`() => void`||
|create|`(options: DialogOption) => DialogReactive`||
|error|`(options: DialogOption) => DialogReactive`||
|info|`(options: DialogOption) => DialogReactive`||
|success|`(options: DialogOption) => DialogReactive`||
|warning|`(options: DialogOption) => DialogReactive`||

### DialogOption Properties
|Name|Type|Default|Description|
|-|-|-|-|
|bordered|`boolean`|`false`||
|closable|`boolean`|`true`||
|content|`string \| (() => VNode \| Array<VNode>)`|`undefined`|Can be a render function.|
|icon-placement|`'left' \| 'top'`|`'left'`||
|icon|`() => VNode \| Array<VNode>`|`undefined`|Render function.|
|loading|`boolean`|`false`||
|negative-text|`string`|`undefined`|Corresponding button won't show if not set.|
|positive-text|`string`|`undefined`|Corresponding button won't show if not set.|
|show-icon|`boolean`|`true`||
|theme|`'light' \| 'dark' \| string`|`undefined`||
|title|`string \| (() => VNode \| Array<VNode>)`|`undefined`|Can be a render function.|
|type|`'error \| 'success' \| 'warning'`|`'warning'`||
|onClose|`() => boolean \| Promise<boolean> \| any`|`undefined`|The default behavior is closing the confirm. Return `false` or resolve `false` or Promise rejected will prevent the default behavior.|
|onNegativeClick|`() => boolean \| Promise<boolean> \| any`|`undefined`|The default behavior is closing the confirm. Return `false` or resolve `false` or Promise rejected will prevent the default behavior.|
|onPositiveClick|`() => boolean \| Promise<boolean> \| any`|`undefined`|The default behavior is closing the confirm. Return `false` or resolve `false` or Promise rejected will prevent the default behavior.|

### DialogReactive API
#### DialogReactive Properties
All the properties can be modified dynamically.

|Name|Type|Description|
|-|-|-|
|bordered|`boolean`||
|closable|`boolean`||
|content|`string \| (() => VNode \| Array<VNode>)`|Can be a render function.|
|icon-placement|`'left' \| 'top'`|`'left'`||
|icon|`() => VNode \| Array<VNode>`|Render function.|
|loading|`boolean`||
|negative-text|`string`|Corresponding button won't show if not set.|
|positive-text|`string`|Corresponding button won't show if not set.|
|show-icon|`boolean`||
|theme|`'light' \| 'dark'`||
|title|`string \| (() => VNode \| Array<VNode>)`|Can be a render function.|
|type|`'error \| 'success' \| 'warning'`||
|onClose|`() => boolean \| Promise<boolean> \| any`||
|onNegativeClick|`() => boolean \| Promise<boolean> \| any`||
|onPositiveClick|`() => boolean \| Promise<boolean> \| any`||

#### DialogReactive Methods
|Name|Type|Description|
|-|-|-|
|destroy|`()`|Close dialog|

## Props
### Dialog Props
|Name|Type|Default|Description|
|-|-|-|-|
|bordered|`boolean`|`false`||
|closable|`boolean`|`boolean`||
|content|`string \| (() => VNode \| Array<VNode>)`|`undefined`|Can be a render function.|
|icon-placement|`'left' \| 'top'`|`'left'`||
|icon|`() => VNode \| Array<VNode>`|`undefined`|Render function.|
|loading|`boolean`|`false`||
|negative-text|`string`|`undefined`|Corresponding button won't show if not set.|
|positive-text|`string`|`undefined`|Corresponding button won't show if not set.|
|show-icon|`boolean`|`true`||
|title|`string \| (() => VNode \| Array<VNode>)`|`undefined`|Can be a render function.|
|type|`'error \| 'success' \| 'warning'`|`'warning'`||
|on-close|`() => any`||
|on-negative-click|`() => any`||
|on-positive-click|`() => any`||

## Slots
### Dialog Slots
|Name|Parameters|Description|
|-|-|-|
|action|`()`||
|default|`()`|Content|
|header|`()`||
|icon|`()`||

