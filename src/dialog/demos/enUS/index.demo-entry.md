# Dialog

Before taking action, please confirm.

<n-alert title="Prerequisite" type="warning">
  If you want use dialog, you need to wrap the component where you call related methods inside <n-text code>n-dialog-provider</n-text> and use <n-text code>useDialog</n-text> to get the API.
</n-alert>

For example:

```html
<!-- App.vue -->
<n-dialog-provider>
  <content />
</n-dialog-provider>
```

```js
import { defineComponent } from 'vue'
import { useDialog } from 'naive-ui'

// content
export default defineComponent({
  setup () {
    const dialog = useDialog()
    return {
      warning () {
        dialog.warning(options)
      }
    }
  }
})
```

## Demos

```demo
basic.vue
async.vue
use-component.vue
mask.vue
action.vue
```

## API

### useDialog API

| Name | Type | Description |
| --- | --- | --- |
| destroyAll | `() => void` | Destroy all popup dialogs. |
| create | `(options: DialogOptions) => DialogReactive` | Create a dialog. |
| error | `(options: DialogOptions) => DialogReactive` | Use `error` type dialog. |
| info | `(options: DialogOptions) => DialogReactive` | Use `info` type dialog. |
| success | `(options: DialogOptions) => DialogReactive` | Use `success` type dialog. |
| warning | `(options: DialogOptions) => DialogReactive` | Use `warning` type dialog. |

### DialogOptions Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| action | `() => VNodeChild` | `undefined` | Content of the operation area, must be a `render` function. |
| bordered | `boolean` | `false` | Whether to show `border`. |
| closable | `boolean` | `true` | Whether to show `close` icon. |
| content | `string \| (() => VNodeChild)` | `undefined` | Content, can be a `render` function. |
| iconPlacement | `'left' \| 'top'` | `'left'` | Icon placement. |
| icon | `() => VNodeChild` | `undefined` | `Render` function of `icon`. |
| loading | `boolean` | `false` | Whether to display `loading` status. |
| maskClosable | `boolean` | `true` | Whether the dialog can be closed by clicking the `mask`. |
| negativeText | `string` | `undefined` | Corresponding button won't show if not set. |
| positiveText | `string` | `undefined` | Corresponding button won't show if not set. |
| show-icon | `boolean` | `true` | Whether to show `icon`. |
| style | `string \| Object` | Style of the dialog. |
| title | `string \| (() => VNodeChild)` | `undefined` | Title, can be a `render` function. |
| type | `'error \| 'success' \| 'warning'` | `'warning'` | Dialog type. |
| onClose | `() => boolean \| Promise<boolean> \| any` | `undefined` | The default behavior is closing the confirm. Return `false` or resolve `false` or `Promise rejected` will prevent the default behavior. |
| onNegativeClick | `() => boolean \| Promise<boolean> \| any` | `undefined` | The default behavior is closing the confirm. Return `false` or resolve `false` or `Promise rejected` will prevent the default behavior. |
| onPositiveClick | `() => boolean \| Promise<boolean> \| any` | `undefined` | The default behavior is closing the confirm. Return `false` or resolve `false` or `Promise rejected` will prevent the default behavior. |
| onMaskClick | `() => void` | `undefined` | Callback triggered when click the mask. |

### DialogReactive API

#### DialogReactive Properties

All the properties can be modified dynamically.

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| bordered | `boolean` | Whether to show `border`. |  |
| closable | `boolean` | Whether to show `close` icon. |  |
| closeOnEsc | `boolean` | Whether to close modal on Esc is pressed. | NEXT_VERSION |
| content | `string \| (() => VNodeChild)` | Content, can be a `render` function. |  |
| iconPlacement | `'left' \| 'top'` | Icon placement. |  |
| icon | `() => VNodeChild` | `Render` function of `icon`. |  |
| loading | `boolean` | Whether to display `loading` status. |  |
| maskClosable | `boolean` | Whether the dialog can be closed by clicking the `mask`. |  |
| negativeText | `string` | Corresponding button won't show if not set. |  |
| positiveText | `string` | Corresponding button won't show if not set. |  |
| show-icon | `boolean` | Whether to show `icon`. |  |
| title | `string \| (() => VNodeChild)` | Can be a `render` function. |  |
| type | `'error \| 'success' \| 'warning'` | Dialog type. |  |
| onClose | `() => boolean \| Promise<boolean> \| any` | The default behavior is closing the confirm. Return `false` or `resolve false` or `Promise rejected` will prevent the default behavior. |  |
| onNegativeClick | `() => boolean \| Promise<boolean> \| any` | The default behavior is closing the confirm. Return `false` or `resolve false` or `Promise rejected` will prevent the default behavior. |  |
| onPositiveClick | `() => boolean \| Promise<boolean> \| any` | The default behavior is closing the confirm. Return `false` or `resolve false` or `Promise rejected` will prevent the default behavior. |  |

#### DialogReactive Methods

| Name    | Type | Description     |
| ------- | ---- | --------------- |
| destroy | `()` | Close `dialog`. |

### Dialog Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to show `border`. |  |
| closable | `boolean` | `true` | Whether to show `close` icon. |  |
| closeOnEsc | `boolean` | `true` | Whether to close modal on Esc is pressed. | NEXT_VERSION |
| content | `string \| (() => VNodeChild)` | `undefined` | Can be a `render` function. |  |
| icon-placement | `'left' \| 'top'` | `'left'` | Icon placement. |  |
| icon | `() => VNodeChild` | `undefined` | `Render` function of icon. |  |
| loading | `boolean` | `false` | Whether to display `loading` status. |  |
| negative-text | `string` | `undefined` | Corresponding button won't show if not set. |  |
| positive-text | `string` | `undefined` | Corresponding button won't show if not set. |  |
| show-icon | `boolean` | `true` | Whether to display the `icon`. |  |
| title | `string \| (() => VNodeChild)` | `undefined` | Title, can be a `render` function. |  |
| type | `'error \| 'success' \| 'warning' \| 'info'` | `'warning'` | Dialog type. |  |
| on-close | `() => void` | `undefined` | The default behavior is closing the confirm. Return `false` or `resolve false` or `Promise rejected` will prevent the default behavior. |  |
| on-negative-click | `() => void` | `undefined` | The default behavior is closing the confirm. Return `false` or `resolve false` or `Promise rejected` will prevent the default behavior. |  |
| on-positive-click | `() => void` | `undefined` | The default behavior is closing the confirm. Return `false` or `resolve false` or `Promise rejected` will prevent the default behavior. |  |

### Dialog Slots

| Name    | Parameters | Description       |
| ------- | ---------- | ----------------- |
| action  | `()`       | `Action` content. |
| default | `()`       | Dialog content.   |
| header  | `()`       | `Header` content. |
| icon    | `()`       | `Icon` content.   |
