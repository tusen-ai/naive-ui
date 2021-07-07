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
import { useDialog } from 'naive-ui'

// content
export default {
  setup () {
    const dialog = useDialog()
    return {
      warning () {
        dialog.warning(options)
      }
    }
  }
}
```

## Demos

```demo
basic
async
use-component
```

## API

### `useDialog` API

| Name | Type | Description |
| --- | --- | --- |
| destroyAll | `() => void` | Destroy all popup dialogs. |
| create | `(options: DialogOption) => DialogReactive` | Create a dialog. |
| error | `(options: DialogOption) => DialogReactive` | Use error type dialog. |
| info | `(options: DialogOption) => DialogReactive` | Use info type dialog. |
| success | `(options: DialogOption) => DialogReactive` | Use success type dialog. |
| warning | `(options: DialogOption) => DialogReactive` | Use warning type dialog. |

### DialogOption Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to show border. |
| closable | `boolean` | `true` | Whether to show close icon. |
| content | `string \| (() => VNodeChild)` | `undefined` | Content, can be a render function. |
| icon-placement | `'left' \| 'top'` | `'left'` | Icon placement. |
| icon | `() => VNodeChild` | `undefined` | Render function of icon. |
| loading | `boolean` | `false` | Whether to display loading status. |
| negative-text | `string` | `undefined` | Corresponding button won't show if not set. |
| positive-text | `string` | `undefined` | Corresponding button won't show if not set. |
| show-icon | `boolean` | `true` | Whether to show icon. |
| title | `string \| (() => VNodeChild)` | `undefined` | Title, can be a render function. |
| type | `'error \| 'success' \| 'warning'` | `'warning'` | Dialog type. |
| onClose | `() => boolean \| Promise<boolean> \| any` | `undefined` | The default behavior is closing the confirm. Return `false` or resolve `false` or Promise rejected will prevent the default behavior. |
| onNegativeClick | `() => boolean \| Promise<boolean> \| any` | `undefined` | The default behavior is closing the confirm. Return `false` or resolve `false` or Promise rejected will prevent the default behavior. |
| onPositiveClick | `() => boolean \| Promise<boolean> \| any` | `undefined` | The default behavior is closing the confirm. Return `false` or resolve `false` or Promise rejected will prevent the default behavior. |

### DialogReactive API

#### DialogReactive Properties

All the properties can be modified dynamically.

| Name | Type | Description |
| --- | --- | --- |
| bordered | `boolean` | Whether to show border. |
| closable | `boolean` | Whether to show close icon. |
| content | `string \| (() => VNodeChild)` | Content, can be a render function. |
| icon-placement | `'left' \| 'top'` | Icon placement. |
| icon | `() => VNodeChild` | Render function of icon. |
| loading | `boolean` | Whether to display loading status. |
| negative-text | `string` | Corresponding button won't show if not set. |
| positive-text | `string` | Corresponding button won't show if not set. |
| show-icon | `boolean` | Whether to show icon. |
| title | `string \| (() => VNodeChild)` | Can be a render function. |
| type | `'error \| 'success' \| 'warning'` | Dialog type. |
| onClose | `() => boolean \| Promise<boolean> \| any` | The default behavior is closing the confirm. Return `false` or resolve `false` or Promise rejected will prevent the default behavior. |
| onNegativeClick | `() => boolean \| Promise<boolean> \| any` | The default behavior is closing the confirm. Return `false` or resolve `false` or Promise rejected will prevent the default behavior. |
| onPositiveClick | `() => boolean \| Promise<boolean> \| any` | The default behavior is closing the confirm. Return `false` or resolve `false` or Promise rejected will prevent the default behavior. |

#### DialogReactive Methods

| Name    | Type | Description   |
| ------- | ---- | ------------- |
| destroy | `()` | Close dialog. |

## Props

### Dialog Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to show border. |
| closable | `boolean` | `true` | Whether to show close icon. |
| content | `string \| (() => VNodeChild)` | `undefined` | Can be a render function. |
| icon-placement | `'left' \| 'top'` | `'left'` | Icon placement. |
| icon | `() => VNodeChild` | `undefined` | Render function of icon. |
| loading | `boolean` | `false` | Whether to display loading status. |
| negative-text | `string` | `undefined` | Corresponding button won't show if not set. |
| positive-text | `string` | `undefined` | Corresponding button won't show if not set. |
| show-icon | `boolean` | `true` |  |
| title | `string \| (() => VNodeChild)` | `undefined` | Title, can be a render function. |
| type | `'error \| 'success' \| 'warning'` | `'warning'` | Dialog type. |
| on-close | `() => void` | Callback function triggered when close dialog, the default behavior is closing the confirm. |
| on-negative-click | `() => void` | Callback function triggered when click negative text, the default behavior is closing the confirm. |
| on-positive-click | `() => void` | Callback function triggered when click positive text, the default behavior is closing the confirm. |

## Slots

### Dialog Slots

| Name    | Parameters | Description     |
| ------- | ---------- | --------------- |
| action  | `()`       | Action content. |
| default | `()`       | Dialog content. |
| header  | `()`       | Header content. |
| icon    | `()`       | Icon content.   |
