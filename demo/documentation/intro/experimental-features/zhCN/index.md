<!--anchor:on-->

# 试验性特性

<n-alert type="warning" title="注意">
  下列的所有功能都是<n-text strong>不稳定</n-text>的。只在真的需要的时候再使用他们，API 有可能在未来被改变。
</n-alert>

## 定制主题

```js
// ...

import naive from 'naive-ui'

naive.styles.light.override({
  derived: {
    primaryColor: 'rgb(255, 0, 0)',
    primaryColorHover: 'rgb(0, 255, 0)',
    primaryColorActive: 'rgb(0, 0, 255)'
  }
})

Vue.use(naive)
```

具体可使用变量请参考源码。

### 使用图森主题

```js
// ...
import tusimpleTheme from 'naive-ui/themes/tusimple'
import naive from 'naive-ui'

naive.use(tusimpleTheme)

Vue.use(naive)
```
