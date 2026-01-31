# Drawer

I think it is similar with modal, with a bit difference on placement.

<n-alert type="warning" title="Notice"  :bordered="false">
  <n-ul align-text>
    <li>
      If you need to use <n-text code>n-drawer-content</n-text>, you should keep <n-text code>n-drawer</n-text>'s <n-text code>native-scrollbar</n-text> prop as <n-text code>true</n-text>.
    </li>
    <li>
      If you want to use <n-text code>useDrawer</n-text> to use drawer, you need to put the component that calls its method inside <n-text code>n-drawer-provider</n-text> and use <n-text code>useDrawer</n-text> to get the API.
    </li>
    <li>
      If you want to know how to use it outside of <n-text code>setup</n-text>, please refer to Q & A at the bottom of this page.
    </li>
  </n-ul>
</n-alert>

## Demos

```demo
basic.vue
reactive.vue
multiple.vue
closable.vue
target.vue
slot.vue
scroll.vue
resizable.vue
```

## API

### DrawerProvider Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| to | `string \| HTMLElement` | `body` | Where the drawer should mount. |  |

### useDrawer API

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| create | `(options: DrawerOptions) => DrawerReactive` | Create drawer |  |
| destroyAll | `() => void` | Destroy all popup drawers |  |

Properties of `DrawerOptions` and `DrawerReactive` are the same as `DrawerProps` (use camelCase, e.g. `mask-closable` should be `maskClosable`). In addition, the following properties are supported:

| Name | Type | Description |
| --- | --- | --- |
| title | `string` | Drawer title |
| closable | `boolean` | Whether to show close button |
| render | `() => VNodeChild` | Render function for drawer content |
| footer | `() => VNodeChild` | Render function for drawer footer |
| headerClass | `string` | Class of header |
| headerStyle | `string \| CSSProperties` | Style of header |
| footerClass | `string` | Class of footer |
| footerStyle | `string \| CSSProperties` | Style of footer |
| bodyClass | `string` | Class of body |
| bodyStyle | `string \| CSSProperties` | Style of body |
| bodyContentClass | `string` | Class of body's scrollable content node |
| bodyContentStyle | `string \| CSSProperties` | Style of body's scrollable content node |

### Drawer Props

| Name | Parameters | Default | Description | Version |
| --- | --- | --- | --- | --- |
| auto-focus | `boolean` | `true` | Whether to focus the first focusable element inside drawer. | 2.24.2 |
| block-scroll | `boolean` | `true` | Whether to disabled body scrolling when it's active. | 2.28.3 |
| close-on-esc | `boolean` | `true` | Whether to close drawer on Esc is pressed. | 2.24.2 |
| content-class | `string` | `undefined` | Class of drawer's scrollable content node. | 2.37.0 |
| content-style | `string \| Object` | `undefined` | Style of drawer's scrollable content node. |  |
| default-width | `number \| string` | `251` | Default width of the drawer, works when placement is `left` and `right`. | 2.31.0 |
| default-height | `number \| string` | `251` | Default height of the drawer, works when placement is `top` and `bottom`. | 2.31.0 |
| display-directive | `'if' \| 'show'` | `'if'` | The display directive to use when `n-drawer` is rendered. `'if'` corresponds to `v-if` and `'show'` corresponds to `v-show`. |  |
| height | `number \| string` | `undefined` | Works when placement is `top` and `bottom`. |  |
| native-scrollbar | `boolean` | `true` | Whether to use native scrollbar on drawer. |  |
| mask-closable | `boolean` | `true` | Whether to emit `hide` event when click mask. |  |
| max-width | `number` | `undefined` | Max width of draggable drawer. | 2.35.0 |
| max-height | `number` | `undefined` | Max height of draggable drawer. | 2.35.0 |
| min-width | `number` | `undefined` | Min width of draggable drawer. | 2.35.0 |
| min-height | `number` | `undefined` | Max height of draggable drawer. | 2.35.0 |
| placement | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | Drawer placement. |  |
| resizable | `boolean` | `false` | Whether to resize the width / height of drawer. | 2.31.0 |
| scrollbar-props | `ScrollbarProps` | `undefined` | See [Scrollbar props](scrollbar#Scrollbar-Props). |  |
| show | `boolean` | `false` | Whether to show drawer. |  |
| show-mask | `boolean` | `true` | Whether to show mask. If set to `'transparent'`, transparent mask would be shown. If set to false, `trap-focus` will be disabled. | 2.28.3 |
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

| Name | Parameters | Default | Description | Version |
| --- | --- | --- | --- | --- |
| body-class | `string` | `undefined` | Drawer content's body class. | 2.37.0 |
| body-style | `string \| Object` | `undefined` | Drawer content's body style. |  |
| body-content-class | `string` | `undefined` | Class of body's scrollable content node. |  |
| body-content-style | `string \| Object` | `undefined` | Style of body's scrollable content node. | 2.37.0 |
| closable | `boolean` | `false` | Whether the drawer content is closable. |  |
| footer-class | `string` | `undefined` | Drawer content's footer class. | 2.37.0 |
| footer-style | `string \| Object` | `undefined` | Drawer content's footer style. |  |
| header-class | `string` | `undefined` | Drawer content's header class. | 2.37.0 |
| header-style | `string \| Object` | `undefined` | Drawer content's header style. |  |
| native-scrollbar | `boolean` | `true` | Whether to use native scrollbar on body part. |  |
| title | `string` | `undefined` | Drawer content title. |  |
| scrollbar-props | `ScrollbarProps` | `undefined` | See [Scrollbar props](scrollbar#Scrollbar-Props) |  |

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

## Q & A

### Use outside of setup

#### Option 1

Use [createDiscreteApi](discrete). If you want to use it, please read its caveats carefully. It's better not to mix it with `useDrawer` in the same App.

#### Option 2

<n-space vertical size="large">
<n-alert type="warning" :bordered="false">
  If you want to use drawer outside of setup, you need to mount the drawer returned by <n-text code>useDrawer</n-text> to window in the top-level setup, and then call it. Before calling, you need to make sure that drawer has been mounted successfully.
</n-alert>

```html
<!-- App.vue -->
<n-drawer-provider>
  <content />
</n-drawer-provider>
```

```html
<!-- content.vue -->
<template>...</template>

<script>
  import { useDrawer } from 'naive-ui'
  import { defineComponent } from 'vue'

  // content
  export default defineComponent({
    setup() {
      window.$drawer = useDrawer()
    }
  })
</script>
```

```js
// xxx.js
export function handler() {
  // Make sure window.$drawer = useDrawer() has been executed in setup
  window.$drawer.create({
    title: 'Title',
    closable: true,
    render: () => 'Content'
  })
}
```

</n-space>
