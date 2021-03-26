# Message

Oracle from the top(always) of the browser.

<n-space vertical>
<n-alert title="Prerequisite" type="warning">
  If you want use message, you need to wrap the component where you call related methods inside <n-text code>n-message-provider</n-text> and use <n-text code>useMessage</n-text> to get the API.
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

// content
export default {
  setup () {
    const message = useMessage()
    return {
      warning () {
        message.warning('...')
      }
    }
  }
}
```

</n-space>

## Demos

```demo
basic
icon
timing
closable
modify-content
manually-close
about-theme
multiple-line
```

## API

### MessageProvider Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| to | `string \| HTMLElement` | `'body'` | Container node of message container. |

### MessageProvider Injection API

#### MessageProvider Injection Methods

| Name | Type | Description |
| --- | --- | --- |
| error | `(content: string, option?: MessageOption) => MessageReactive` |  |
| info | `(content: string, option?: MessageOption) => MessageReactive` |  |
| loading | `(content: string, option?: MessageOption) => MessageReactive` |  |
| success | `(content: string, option?: MessageOption) => MessageReactive` |  |
| warning | `(content: string, option?: MessageOption) => MessageReactive` |  |

#### MessageOption Properties

| Name | Type | Description |
| --- | --- | --- |
| closable | `boolean` |  |
| content | `string \| number \| boolean \| (() => VNode \| Array<VNode>)` | Message content. |
| icon | `() => VNode` | Message icon. |
| onAfterLeave | `Function` | Callback after message disappeared. |
| onLeave | `Function` | Callback when message start to disappear. |

#### MessageReactive Properties

| Name | Type | Description |
| --- | --- | --- |
| closable | `boolean` |  |
| content | `string \| (() => VNode \| Array<VNode>)` | Message content. |
| icon | `() => VNode` | Message icon. |
| type | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading'` |  |
| onAfterLeave | `Function` | Callback after message disappeared. |
| onLeave | `Function` | Callback when message start to disappear. |

#### MessageReactive Methods

| Name    | Type | Description |
| ------- | ---- | ----------- |
| destroy | `()` |             |
