<!--anchor:on-->
# 试验性特性
<n-alert type="warning" title="注意">
  下列的所有功能都是<n-text strong>不稳定</n-text>的。只在真的需要的时候再使用他们，API 有可能在未来被改变。
</n-alert>

## 定制主题

这是一个试验性特性。

```js
// ...

import naive from 'naive-ui'

naive.styles.light.override({
  derived: {
    primaryColor: 'rgb(255, 0, 0)',
    primaryHoverColor: 'rgb(0, 255, 0)',
    primaryActiveColor: 'rgb(0, 0, 255)'
  }
})

Vue.use(naive)
```

好了。