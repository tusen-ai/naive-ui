# 代码 Code

## 预备条件

<n-alert title="注意" type="warning" style="margin-bottom: 16px;">
  由于尺寸原因，Naive UI 并不把 highlight.js 内置。如果你需要使用代码组件，请确保你在使用之前已经设定了 highlight.js。
</n-alert>

下面的代码展示了如何为 Code 设定 hljs。比较推荐的方式是按需引入，因为它可以极大地减小打包尺寸。

```html
<template>
  <n-config-provider :hljs="hljs">
    <my-app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import hljs from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'

  hljs.registerLanguage('javascript', javascript)

  export default defineComponent({
    setup() {
      return {
        hljs
      }
    }
  })
</script>
```

## 演示

```demo
basic.vue
inline.vue
loop-debug.vue
```

## API

### Code Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| code | `string` | `''` | 传入的 code 字符串 |
| hljs | `Object` | `undefined` | 如果你想局部设定 hljs，可以通过这个属性传给组件 |
| language | `string` | `undefined` | 代码在 highlightjs 中的语言 |
| trim | `boolean` | `true` | 是否显示 trim 后的代码 |
| inline | `boolean` | `false` | 使用行内样式 |
