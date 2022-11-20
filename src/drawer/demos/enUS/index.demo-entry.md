# Drawer

I think it is similar with modal, with a bit difference on placement.

<n-alert title="Caveat" type="warning" :bordered="false">
  If you need to use <n-text code>n-drawer-content</n-text>, you should keep <n-text code>n-drawer</n-text>'s <n-text code>native-scrollbar</n-text> prop as <n-text code>true</n-text>.
</n-alert>

## Demos

```demo
basic.vue
multiple.vue
closable.vue
target.vue
slot.vue
scroll.vue
resizable.vue
```

## API

### Drawer Props

| Name | Parameters | Default | Description | Version |
| --- | --- | --- | --- | --- |
| auto-focus | `boolean` | `true` | Whether to focus the first focusable element inside drawer. | 2.24.2 |
| block-scroll | `boolean` | `true` | Whether to disabled body scrolling when it's active. | 2.28.3 |
| close-on-esc | `boolean` | `true` | Whether to close drawer on Esc is pressed. | 2.24.2 |
| content-style | `string \| Object` | `undefined` | Style of drawer's scrollable content node. |  |
| default-width | `number \| string` | `251` | Default width of the drawer, works when placement is `left` and `right`. | 2.31.0 |
| default-height | `number \| string` | `251` | Default height of the drawer, works when placement is `top` and `bottom`. | 2.31.0 |
| display-directive | `'if' \| 'show'` | `'if'` | The display directive to use when `n-drawer` is rendered. `'if'` corresponds to `v-if` and `'show'` corresponds to `v-show`. |  |
| height | `number \| string` | `undefined` | Works when placement is `top` and `bottom`. |  |
| native-scrollbar | `boolean` | `true` | Whether to use native scrollbar on drawer. |  |
| mask-closable | `boolean` | `true` | Whether to emit `hide` event when click mask. |  |
| placement | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | Drawer placement. |  |
| resizable | `boolean` | `false` | Whether to resize the width / height of drawer. | 2.31.0 |
| show | `boolean` | `false` | Whether to show drawer. |  |
| show-mask | `boolean` | `true` | Whether to show mask. If set to `'transparent'`, transparent mask would be shown. If set to false, `trap-focus` will be disabled. | 2.28.3 |
| style | `string \| Object` | `undefined` | Style of the drawer. |  |
| to | `string \| HTMLElement` | `'body'` | Container node of the drawer. |  |
| trap-focus | `boolean` | `true` | Whether to trap focus inside drawer. | 2.24.2 |
| width | `number \| string` | `undefined` | Works when placement is `left` and `right`. |  |
| z-index | `number` | `undefined` | Z index of the drawer. | 2.24.0 |
| on-after-enter | `() => void` | `undefined` | Callback after drawer is opened. | 2.28.0 |
| on-after-leave | `() => void` | `undefined` | Callback after drawer is closed. | 2.28.0 |
| on-esc | `() => void` | `undefined` | Callback fired when the escape key is pressed and focus is within drawer. | 2.24.2 |
| on-mask-click | `(e: MouseEvent) => void` | `undefined` | Callback triggered on mask clicked. |  |
| on-update:height | `(height: number) => void` | `undefined` | Callback trigger on drawer height change. | 2.31.0 |
| on-update:show | `(show: boolean) => void` | `undefined` | Callback triggered on drawer display status would change. |  |
| on-update:width | `(width: number) => void` | `undefined` | Callback trigger on drawer width change. | 2.31.0 |

### DrawerContent Props

| Name | Parameters | Default | Description |
| --- | --- | --- | --- |
| body-style | `string \| Object` | `undefined` | Drawer content's body style. |
| body-content-style | `string \| Object` | `undefined` | Style of body's scrollable content node. |
| closable | `boolean` | `false` | Whether the drawer content is closable. |
| footer-style | `string \| Object` | `undefined` | Drawer content's footer style. |
| header-style | `string \| Object` | `undefined` | Drawer content's header style. |
| native-scrollbar | `boolean` | `true` | Whether to use native scrollbar on body part. |
| title | `string` | `undefined` | Drawer content title. |

### Drawer Slots

| Name    | Parameters | Description                |
| ------- | ---------- | -------------------------- |
| default | `()`       | The content of the drawer. |

### DrawerContent Slots

| Name    | Parameters | Description                        |
| ------- | ---------- | ---------------------------------- |
| default | `()`       | The content of the drawer content. |
| footer  | `()`       | The footer of the drawer content.  |
| header  | `()`       | The header of the drawer content.  |
