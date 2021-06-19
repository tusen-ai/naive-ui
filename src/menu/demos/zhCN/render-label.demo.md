# 批量处理菜单渲染

使用 `renderLabel` 可以批量处理我们在 `options` 中传入的 `label`。

```html
<n-menu :options="menuOptions" :renderLabel="handleRenderLabel" />
```

```js
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
import {
  HomeOutline as HomeIcon,
  BookOutline as BookIcon,
  DocumentTextOutline as DocumentTextIcon
} from '@vicons/ionicons5'

function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://www.naiveui.com/zh-CN/os-theme',
          target: '_blank',
          rel: 'home'
        },
        '首页'
      ),
    key: 'home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: '文档',
    key: '/zh-CN/os-theme/docs/introduction',
    icon: renderIcon(DocumentTextIcon)
  },
  {
    label: '组件',
    key: '/zh-CN/os-theme/components',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '卡片',
        key: '/zh-CN/os-theme/components/card'
      },
      {
        label: '折叠面板',
        key: '/zh-CN/os-theme/components/collapse'
      }
    ]
  }
]

export default {
  setup () {
    return {
      menuOptions,
      handleRenderLabel (option) {
        if (typeof option.label === 'function') {
          return option.label()
        }
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
