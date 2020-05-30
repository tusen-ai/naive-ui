# Code

## Prequisites

<n-alert title="Note" type="warning" style="margin-bottom: 16px;">
  Due to package size, Naive UI doesn't include highlight.js. If you want use Code, make sure you have set highlightjs before using it.
</n-alert>

The following code shows how to set hljs of Naive UI. Importing highlight.js on demand is recommonded, because it can significantly reduce bundle size of your app.

```js
import Vue from 'vue'
import NaiveUI from 'naive-ui'
import hljs from 'highlight.js/lib/highlight'
import cpp from 'highlight.js/lib/languages/cpp'

hljs.registerLanguage('cpp', cpp)
Vue.use(NaiveUI)
NaiveUI.setHljs(hljs)
```

## Demos

```demo
basic
```

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|language|`string`|`null`||
|code|`string`|`null`||
|trim|`boolean`|`true`||
|hljs|`object`|`null`|If you want to set hljs locally, set it on code by the prop|
