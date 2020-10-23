# 对话框 Dialog
执行之前，请确认。

<n-space vertical align="stretch">
<n-alert title="使用前提" type="warning">
  如果你想使用对话框，你需要把调用其方法的组件放在 <n-text code>n-dialog-provider</n-text> 内部并且注入 <n-text code>dialog</n-text>。
</n-alert>
例如：

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

## 演示
```demo
basic
async
use-component
```

## API
### `dialog` Injection API
|名称|类型|说明|
|-|-|-|
|destroyAll|`() => void`||
|error|`(options: DialogOption) => DialogReactive`||
|success|`(options: DialogOption) => DialogReactive`||
|warning|`(options: DialogOption) => DialogReactive`||

### DialogOption Properties
|名称|类型|默认值|说明|
|-|-|-|-|
|bordered|`boolean`|`false`||
|closable|`boolean`|`true`||
|content|`string \| (() => VNode \| Array<VNode>)`|`undefined`|可以是 render 函数|
|icon|`() => VNode \| Array<VNode>`|`undefined`|需要是 render 函数|
|loading|`boolean`|`false`||
|negative-text|`string`|`undefined`|不填对应的按钮不会出现|
|positive-text|`string`|`undefined`|不填对应的按钮不会出现|
|show-icon|`boolean`|`true`||
|theme|`'light' \| 'dark'  \| string`|`undefined`||
|title|`string \| (() => VNode \| Array<VNode>)`|`undefined`|可以是 render 函数|
|type|`'error \| 'success' \| 'warning'`|`'warning'`||
|onPositiveClick|`() => boolean \| Promise<boolean> \| any`|`undefined`|默认行为是关闭确认框。返回 `false` 或者 resolve `false` 或者 Promise 被 reject 会避免默认行为|
|onNegativeClick|`() => boolean \| Promise<boolean> \| any`|`undefined`|默认行为是关闭确认框。返回 `false` 或者 resolve `false` 或者 Promise 被 reject 会避免默认行为|
|onClose|`() => boolean \| Promise<boolean> \| any`|`undefined`|默认行为是关闭确认框。返回 `false` 或者 resolve `false` 或者 Promise 被 reject 会避免默认行为|

### DialogReactive API
#### DialogReactive Properties
下列属性都可以被动态修改。

|名称|类型|说明|
|-|-|-|
|bordered|`boolean`||
|closable|`boolean`||
|content|`string \| (() => VNode \| Array<VNode>)`|可以是 render 函数|
|icon|`() => VNode \| Array<VNode>`|需要是 render 函数|
|loading|`boolean`||
|negative-text|`string`|不填对应的按钮不会出现|
|positive-text|`string`|不填对应的按钮不会出现|
|show-icon|`boolean`||
|theme|`'light' \| 'dark'`||
|title|`string \| (() => VNode \| Array<VNode>)`|可以是 render 函数|
|type|`'error \| 'success' \| 'warning'`||
|onPositiveClick|`() => boolean \| Promise<boolean> \| any`||
|onNegativeClick|`() => boolean \| Promise<boolean> \| any`||
|onClose|`() => boolean \| Promise<boolean> \| any`||

#### DialogReactive Methods
|名称|类型|说明|
|-|-|-|
|destroy|`()`|关闭 Dialog|

## Props
### Dialog Props
|名称|类型|默认值|说明|
|-|-|-|-|
|bordered|`boolean`|`false`||
|closable|`boolean`|`boolean`||
|content|`string \| (() => VNode \| Array<VNode>)`|`undefined`|可以是 render 函数|
|icon|`() => VNode \| Array<VNode>`|`undefined`|需要是 render 函数|
|loading|`boolean`|`false`||
|negative-text|`string`|`undefined`|不填对应的按钮不会出现|
|positive-text|`string`|`undefined`|不填对应的按钮不会出现|
|show-icon|`boolean`|`true`||
|title|`string \| (() => VNode \| Array<VNode>)`|`undefined`|可以是 render 函数|
|type|`'error \| 'success' \| 'warning'`|`'warning'`||
|on-positive-click|`() => any`||
|on-negative-click|`() => any`||
|on-close|`() => any`||

## Slots
### Dialog Slots
|名称|参数|说明|
|-|-|-|
|action|`()`||
|default|`()`|内容|
|header|`()`||
|icon|`()`||

