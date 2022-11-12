# Message

Oracle from the top(always) of the browser.

<n-space vertical size="large">
<n-alert title="Prerequisite" type="warning" :bordered="false">
  If you want to use message, you need to wrap the component where you call related methods inside <n-text code>n-message-provider</n-text> and use <n-text code>useMessage</n-text> to get the API.
  <br/>
  If you want to use it outside setup, please refer to Q & A part at the bottom of the page.
</n-alert>
For example:

```html
<!-- App.vue -->
<n-message-provider>
  <content />
</n-message-provider>
```

```js
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

// content
export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      warning () {
        message.warning('...')
      }
    }
  }
})
```

</n-space>

## Demos

```demo
basic.vue
icon.vue
timing.vue
closable.vue
modify-content.vue
manually-close.vue
about-theme.vue
multiple-line.vue
placement.vue
customize-message.vue
no-icon.vue
```

## API

### MessageProvider Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| closable | `boolean` | `false` | Whether to show close icon on all messages. |  |
| container-style | `string \| CSSProperties` | `undefined` | Message container style. |  |
| duration | `number` | `3000` | Default duration of on all messages. |  |
| keep-alive-on-hover | `boolean` | `false` | Whether to destroy while hovering on all messages. |  |
| max | `number` | `undefined` | Limit the number of messages to display. |  |
| placement | `top \| top-left \| top-right \| bottom \| bottom-left \| bottom-right ` | `top` | Placement of all messages. |  |
| to | `string \| HTMLElement` | `'body'` | Container node of message container. |  |

### MessageProvider Injection API

#### MessageProvider Injection Methods

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| destroyAll | `() => void` | Destroy all popup messages. |  |
| create | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use create type message. | 2.25.7 |
| error | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use error type message. |  |
| info | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use info type message. |  |
| loading | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use loading type message. |  |
| success | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use success type message. |  |
| warning | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use warning type message. |  |

#### MessageOption Properties

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| closable | `boolean` | Whether to show close icon. |  |
| duration | `number` | The duration of the message. |  |
| icon | `() => VNodeChild` | Message icon. |  |
| keepAliveOnHover | `boolean` | Messages whether to destroy while hover. |  |
| render | `MessageRenderMessage` | Render function of the entire message. | 2.24.0 |
| showIcon | `boolean` | Whether to show icon. | 2.25.7 |
| type | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading' \| 'default'` | Message type. | `'default'` 2.25.7 |
| onAfterLeave | `() => void` | Callback after message disappeared. |  |
| onClose | `() => void` | Callback when close icon is clicked. |  |
| onLeave | `() => void` | Callback when message start to disappear. |  |

#### MessageRenderMessage Type

```ts
type MessageRenderMessage = (props: {
  content?: string | number | (() => VNodeChild)
  icon?: () => VNodeChild
  closable: boolean
  type: 'info' | 'success' | 'warning' | 'error' | 'loading'
  onClose?: () => void
}) => VNodeChild
```

#### MessageReactive Properties

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| closable | `boolean` | Whether to show close icon. |  |
| content | `string \| (() => VNodeChild)` | Message content. |  |
| destroy | `() => void` | Message destroy method. |  |
| icon | `() => VNodeChild` | Message icon. |  |
| keepAliveOnHover | `boolean` | Messages whether to destroy while hover |  |
| showIcon | `boolean` | Whether to show icon. | 2.25.7 |
| type | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading' \| 'default'` | Message type. | `'default'` 2.25.7 |
| onAfterLeave | `() => void` | Callback after message disappeared. |  |
| onLeave | `() => void` | Callback when message start to disappear. |  |

#### MessageReactive Methods

| Name    | Type | Description             |
| ------- | ---- | ----------------------- |
| destroy | `()` | Message destroy method. |

## Q & A

### Use Message Outside Setup

#### Option 1

Use [createDiscreteApi](discrete). If you want to use it, read its caveat carefully. You'd better not use `useMessage` and it together in a same app.

#### Option 2

<n-space vertical size="large">
<n-alert type="warning" :bordered="false">
  You need to mount the return value of <n-text code>useMessage</n-text> to the window in the top-level setup and then call it. Before calling it, you need to make sure that message has been mounted successfully.
</n-alert>

```html
<!-- App.vue -->
<n-message-provider>
  <content />
</n-message-provider>
```

```html
<!-- content.vue -->
<template>...</template>

<script>
  import { useMessage } from 'naive-ui'
  import { defineComponent } from 'vue'

  // content
  export default defineComponent({
    setup() {
      window.$message = useMessage()
    }
  })
</script>
```

```js
// xxx.js
export const handler = () => {
  // You need to ensure that window.$message = message has been executed in setup
  window.$message.success(
    'Cause you walked hand in hand With another man in my place'
  )
}
```

</n-space>
