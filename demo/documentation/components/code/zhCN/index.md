# 代码 Code

## 预备条件

<n-alert title="注意" type="warning" style="margin-bottom: 16px;">
  由于尺寸原因，Naive UI 并不把 hightlight.js 内置。如果你需要使用代码组件，请确保你在使用之前已经设定了 highlight.js。
</n-alert>

下面的代码展示了如何为 Naive UI 设定 hljs。比较推荐的方式是按需引入，因为它可以极大的减小打包尺寸。

```js
import Vue from 'vue'
import NaiveUI from 'naive-ui'
import hljs from 'highlight.js/lib/highlight'
import cpp from 'highlight.js/lib/languages/cpp'

hljs.registerLanguage('cpp', cpp)
Vue.use(NaiveUI)
NaiveUI.setHljs(hljs)
```

## 演示

```demo
basic
```

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|language|`string`|`null`||
|code|`string`|`null`||
|trim|`boolean`|`true`||
|hljs|`object`|`null`|如果你想局部设定 hljs，可以通过这个属性传给组件|
