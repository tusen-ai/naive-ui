# 使用 vue-router

你可以在这个地方配合 vue-router 完成路由。通过将 `label` 渲染为 `<router-link />` 来改变路由。

```html
<n-menu :options="menuOptions" />
```

```js
import { defineComponent, h } from 'vue'
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  DesktopOutline as WorkIcon,
  LogOutOutline as HomeIcon
} from '@vicons/ionicons5'

function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'home',
            params: {
              lang: 'zh-CN'
            }
          }
        },
        { default: () => '回家' }
      ),
    key: 'go-back-home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/zh-CN/os-theme/components/code'
          }
        },
        { default: () => '上班' }
      ),
    key: 'go-to-work',
    icon: renderIcon(WorkIcon)
  }
]

export default defineComponent({
  setup () {
    return {
      menuOptions
    }
  }
})
```
