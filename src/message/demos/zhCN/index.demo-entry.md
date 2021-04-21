# 信息 Message

（一般是）从浏览器顶部降下来的神谕。

<n-space vertical>
<n-alert title="使用前提" type="warning">
  如果你想使用信息，你需要把调用其方法的组件放在 <n-text code>n-message-provider</n-text> 内部并且使用 <n-text code>useMessage</n-text> 去获取 API。
</n-alert>
例如：

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

## 演示

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

| 名称 | 类型                    | 默认值   | 说明                   |
| ---- | ----------------------- | -------- | ---------------------- |
| to   | `string \| HTMLElement` | `'body'` | Message 容器节点的位置 |

### MessageProvider Injection API

#### MessageProvider Injection Methods

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| error | `(content: string, option?: MessageOption) => MessageReactive` |  |
| info | `(content: string, option?: MessageOption) => MessageReactive` |  |
| loading | `(content: string, option?: MessageOption) => MessageReactive` |  |
| success | `(content: string, option?: MessageOption) => MessageReactive` |  |
| warning | `(content: string, option?: MessageOption) => MessageReactive` |  |

#### MessageOption Properties

| 名称         | 类型                           | 说明                   |
| ------------ | ------------------------------ | ---------------------- |
| closable     | `boolean`                      |                        |
| content      | `string \| (() => VNodeChild)` | 信息内容               |
| icon         | `() => VNode`                  | 信息图标               |
| onAfterLeave | `Function`                     | 信息消失动画结束的回调 |
| onLeave      | `Function`                     | 信息开始消失的回调     |

#### MessageReactive Properties

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| closable | `boolean` |  |
| content | `string \| number \| boolean \| (() => VNodeChild)` | 信息内容 |
| icon | `() => VNode` | 信息图标 |
| type | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading'` |  |
| onAfterLeave | `Function` | 信息消失动画结束的回调 |
| onLeave | `Function` | 信息开始消失的回调 |

#### MessageReactive Methods

| 名称    | 类型 | 说明 |
| ------- | ---- | ---- |
| destroy | `()` |      |
