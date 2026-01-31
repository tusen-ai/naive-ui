# Modal

It just pops and shows you something.

<n-space vertical size="large">
<n-alert type="warning" title="Notice" :bordered="false">
  <n-ul align-text>
    <li>
      If you want to use <n-text code>useModal</n-text> to create modal, you need to put the component that calls its method inside <n-text code>n-modal-provider</n-text> and use <n-text code>useModal</n-text> to get the API.
    </li>
    <li>
      If you want to know how to use it outside of <n-text code>setup</n-text>, please refer to Q & A at the bottom of this page.
    </li>
  </n-ul>
</n-alert>

For example:

```html
<!-- App.vue -->
<n-modal-provider>
  <content />
</n-modal-provider>
```

```js
import { useModal } from 'naive-ui'
import { defineComponent } from 'vue'

// content
export default defineComponent({
  setup() {
    const modal = useModal()
    return {
      showModal() {
        modal.create({
          title: 'Title',
          content: 'Content'
        })
      }
    }
  }
})
```

</n-space>

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
draggable.vue
mask-visible.vue
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
| draggable | `boolean \| { bounds?: 'window' }` | `false` | Whether the modal is draggable. Make its position not bound inside window using `bounds === 'none'`. | 2.41.0 |
| mask-closable | `boolean` | `true` | Whether to emit `hide` event when click mask. |  |
| preset | `'dialog' \| 'card'` | `undefined` | The preset of `n-modal`. |  |
| show | `boolean` | `false` | Whether to show modal. |  |
| show-mask | `boolean` | `true` | Whether to display the mask. If it's set to `false`, all mask-related APIs will be disabled, focus won't be limit inside modal (so keyboard event like Esc won't always work). | 2.43.0 |
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

`default` slot's parameter is different, which is `(props: { draggableClass: string })`.

### Modal with Preset Dialog Slots

See [Dialog slots](dialog#Dialog-Slots)

`default` slot's parameter is different, which is `(props: { draggableClass: string })`.

## Q & A

### Use Modal Outside Setup

#### Option 1

Use [createDiscreteApi](discrete). If you want to use it, read its caveat carefully. You'd better not use `useModal` and it together in a same app.

#### Option 2

<n-space vertical size="large">
<n-alert type="warning" :bordered="false">
  You need to mount the return value of <n-text code>useModal</n-text> to the window in the top-level setup and then call it. Before calling it, you need to make sure that modal has been mounted successfully.
</n-alert>

```html
<!-- App.vue -->
<n-modal-provider>
  <content />
</n-modal-provider>
```

```html
<!-- content.vue -->
<template>...</template>

<script>
  import { useModal } from 'naive-ui'
  import { defineComponent } from 'vue'

  // content
  export default defineComponent({
    setup() {
      window.$modal = useModal()
    }
  })
</script>
```

```js
// xxx.js
export function handler() {
  // You need to ensure that window.$modal = modal has been executed in setup
  window.$modal.create({
    title: 'Title',
    content: 'Content'
  })
}
```

</n-space>
