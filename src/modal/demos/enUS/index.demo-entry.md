# Modal

It just pops and shows you something.

## Demos

```demo
basic.vue
controlled.vue
mask-closable.vue
custom-position.vue
preset-card.vue
preset-confirm.vue
preset-confirm-slot.vue
transform-origin.vue
```

## API

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
