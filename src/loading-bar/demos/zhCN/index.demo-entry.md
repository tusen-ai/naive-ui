# 加载条 Loading Bar

焦虑的安慰剂，疗效尚可。

<n-space vertical size="large">
<n-alert title="使用前提" type="warning" :bordered="false">
  如果你想使用加载条，你需要把调用其方法的组件放在 <n-text code>n-loading-bar-provider</n-text> 内部并且注入 <n-text code>loadingBar</n-text>。
</n-alert>
例如：

```html
<!-- App.vue -->
<n-loading-bar-provider>
  <content />
</n-loading-bar-provider>
```

```js
import { defineComponent } from 'vue'
import { useLoadingBar } from 'naive-ui'

// content
export default defineComponent({
  setup () {
    const loadingBar = useLoadingBar()
    return {
      loading () {
        loadingBar.start()
      }
    }
  }
})
```

</n-space>

## 演示

```demo
basic.vue
container.vue
```

## API

### LoadingBarProvider Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| container-style | `string \| object` | `undefined` | 加载条容器的样式 | 2.33.4 |
| loading-bar-style | `{ loading?: string \| object, error?: string \| object }` | `undefined` | 加载条样式 |  |
| to | `string \| HTMLElement \| false` | `undefined` | 加载条的挂载位置 | 2.33.4 |

### loadingBar Injection Methods

| 名称   | 类型         | 说明                     |
| ------ | ------------ | ------------------------ |
| error  | `() => void` | 加载条出现错误的回调函数 |
| finish | `() => void` | 加载条结束加载的回调函数 |
| start  | `() => void` | 加载条开始加载的回调函数 |
