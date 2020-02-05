# 代码 Code

## 预备条件

<n-alert title="Note" type="warning">
  由于尺寸原因，Naive UI 并不把 hightlight.js 内置。如果你需要高亮日志，请确保你在使用之前已经设定了 highlight.js。
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

## 例子

```demo
basic
```

## Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|language|`string`|`null`||
|code|`string`|`null`||
|trim|`boolean`|`true`||
|hljs|`object`|`null`|If you want to set hljs locally, set it on code by the prop|
