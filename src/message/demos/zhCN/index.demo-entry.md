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

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| closable | `boolean` | 所有 Message 是否显示 close 图标 |
| duration | `number` | `3000` | 所有 Message 默认的持续时长 |
| max | `number` | `undefined` | 限制提示信息显示的个数 |
| to | `string \| HTMLElement` | `'body'` | Message 容器节点的位置 |

### MessageProvider Injection API

#### MessageProvider Injection Methods

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| destroyAll | `() => void` | 销毁所有弹出的信息 |
| error | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | 调用 error 类型的信息 |
| info | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | 调用 info 类型的信息 |
| loading | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | 调用 loading 类型的信息 |
| success | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | 调用 success 类型的信息 |
| warning | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | 调用 warning 类型的信息 |

#### MessageOption Properties

| 名称         | 类型          | 说明                   |
| ------------ | ------------- | ---------------------- |
| closable     | `boolean`     | 是否显示 close 图标    |
| duration     | `number`      | 信息展示的时长         |
| icon         | `() => VNode` | 信息图标               |
| onAfterLeave | `() => void`  | 信息消失动画结束的回调 |
| onClose      | `() => void`  | 点击关闭图标的回调     |
| onLeave      | `() => void`  | 信息开始消失的回调     |

#### MessageReactive Properties

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| closable | `boolean` | 是否显示 close 图标 |
| content | `string \| (() => VNodeChild)` | 信息内容 |
| destory | `() => void` | 销毁信息的方法 |
| icon | `() => VNode` | 信息图标 |
| type | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading'` | 信息类型 |
| onAfterLeave | `() => void` | 信息消失动画结束的回调 |
| onLeave | `() => void` | 信息开始消失的回调 |

#### MessageReactive Methods

| 名称    | 类型 | 说明           |
| ------- | ---- | -------------- |
| destroy | `()` | 销毁信息的方法 |

## Q & A

### 在 setup 外使用

<n-space vertical>
<n-alert type="warning">
  如果你想在 setup 外使用信息，你需要在顶层 setup 中把 <n-text code>useMessage</n-text> 返回的 message 值挂载到 window 下然后再调用，调用前需要确保 message 已经挂载成功。
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
  // 需要确保已经在 setup 中执行了 window.$message = message
  window.$message.success(
    'Cause you walked hand in hand With another man in my place'
  )
}
```

</n-space>
