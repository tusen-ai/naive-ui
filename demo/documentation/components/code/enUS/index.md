# Code

## Prequisites

<n-alert title="Note" type="warning">
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