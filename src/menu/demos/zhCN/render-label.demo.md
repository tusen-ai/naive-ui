# 批量处理菜单渲染

使用 `renderLabel` 可以批量控制菜单的选项渲染。

```html
<n-menu :options="menuOptions" :render-label="renderMenuLabel" />
```

```js
import { h } from 'vue'
import { RouterLink } from 'vue-router'

const menuOptions = [
  {
    label: '首页',
    key: '/'
  },
  {
    label: '文档',
    key: '/zh-CN/os-theme/docs/introduction'
  },
  {
    label: '组件',
    key: '/zh-CN/os-theme/components'
  }
]

export default {
  setup () {
    return {
      menuOptions,
      renderMenuLabel (option) {
        return h(
          RouterLink,
          {
            to: option.key
          },
          { default: () => option.label }
        )
      }
    }
  }
}
```
