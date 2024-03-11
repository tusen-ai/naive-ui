# Modal

It just pops and shows you something.

<n-alert title="Prerequisite" type="warning" :bordered="false">
  If you want to create modal using <n-text code>useModal</n-text>, you need to wrap the component where you call related methods inside <n-text code>n-modal-provider</n-text> and use <n-text code>useModal</n-text> to get the API.
</n-alert>

For example:

```html
<!-- App.vue -->
<n-modal-provider>
  <content />
</n-modal-provider>
```

## Demos

```demo
basic.vue
reactive.vue
controlled.vue
mask-closable.vue
custom-position.vue
preset-card.vue
preset-confirm.vue
preset-confirm-slot.vue
transform-origin.vue
```

## API

### ModalProvider Props

Provided since `2.38.0`.

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| to | `string \| HTMLElement` | `body` | Container node of the modal content. | 2.38.0 |

### useModal API

Provided since `2.38.0`.

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| create | `(options: ModalOptions) => ModalReactive` | Create a modal. | 2.38.0 |
| destroyAll | `() => void` | Destroy all modals. | 2.38.0 |

`ModalOptions` and `ModalReactive`'s properties are the same as `ModalProps` (properties should use camelCase, for example `auto-focus` property should use `autoFocus` as option property).

### Modal Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| auto-focus | `boolean` | `true` | Whether to focus the first focusable element inside modal. | 2.24.2 |
| block-scroll | `boolean` | `true` | Whether to disabled body scrolling when it's active. | 2.28.3 |
| close-on-esc | `boolean` | `true` | Whether to close modal on Esc is pressed. | 2.24.2 |
| display-directive | `'if' \| 'show'` | `'if'` | Use which directive to control the rendering of modal body. |  |
| mask-closable | `boolean` | `true` | Whether to emit `hide` event when click mask. |  |
| preset | `'dialog' \| 'card'` | `undefined` | The preset of `n-modal`. |  |
| show | `boolean` | `false` | Whether to show modal. |  |
| to | `string \| HTMLElement` | `body` | Container node of the modal content. |  |
| transform-origin | `'mouse' \| 'center'` | `'mouse'` | The transform origin of the modal's display animation. |  |
| trap-focus | `boolean` | `true` | Whether to trap focus inside modal. | 2.24.2 |
| z-index | `number` | `undefined` | Z index of the modal. | 2.24.0 |
| on-after-enter | `() => void` | `undefined` | Callback after modal is opened. |  |
| on-after-leave | `() => void` | `undefined` | Callback after modal is closed. |  |
| on-esc | `() => void` | `undefined` | Callback fired when the escape key is pressed and focus is within modal. | 2.24.2 |
| on-mask-click | `() => void` | `undefined` | Callback on mask is clicked. |  |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback when modal's display status is changed. |  |

### ModalProvider Props

Provided since 2.38.0.

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| to | `string \| HTMLElement` | `body` | Container node of the modal content. | 2.38.0 |

### Modal with Preset Card Props

See [Card props](card#Card-Props)

### Modal with Preset Dialog Props

See [Dialog props](dialog#Dialog-Props)

### Modal without Preset Slots

| Name    | Parameters | Description               |
| ------- | ---------- | ------------------------- |
| default | `()`       | The content of the modal. |

### Modal with Preset Card Slots

See [Card slots](card#Card-Slots)

### Modal with Preset Dialog Slots

See [Dialog slots](dialog#Dialog-Slots)
