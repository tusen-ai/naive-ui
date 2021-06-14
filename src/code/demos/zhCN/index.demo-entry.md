# 代码 Code

## 预备条件

<n-alert title="注意" type="warning" style="margin-bottom: 16px;">
  由于尺寸原因，Naive UI 并不把 highlight.js 内置。如果你需要使用代码组件，请确保你在使用之前已经设定了 highlight.js。
</n-alert>

下面的代码展示了如何为 Code 设定 hljs。比较推荐的方式是按需引入，因为它可以极大的减小打包尺寸。

```html
<template>
  <n-config-provider :hljs="hljs">
    <my-app />
  </n-config-provider>
</template>

<script>
  import hljs from 'highlight.js/lib/core'
  import cpp from 'highlight.js/lib/languages/cpp'

  hljs.registerLanguage('cpp', cpp)

  export default {
    setup() {
      return {
        hljs
      }
    }
  }
</script>
```

## 演示

```demo
basic
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| code | `string` | `''` | 传入的 code 字符串 |
| hljs | `Object` | `undefined` | 如果你想局部设定 hljs，可以通过这个属性传给组件 |
| language | `string` | `undefined` | 设置的编码语言 |
| trim | `boolean` | `true` | 编码是否 trim |
| uri | `boolean` | `false` | 是否 decodeURIComponent |

## Slots

| 名称    | 参数 | 说明                |
| ------- | ---- | ------------------- |
| default | `()` | code 默认填充的内容 |
