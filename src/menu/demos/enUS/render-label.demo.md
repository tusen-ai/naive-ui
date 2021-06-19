# Render Label

The `renderLabel` can be used to batch process the `label` we pass in in `options`.

```html
<n-menu :options="menuOptions" :render-label="renderMenuLabel" />
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
          href: 'https://www.naiveui.com/en-US/os-theme',
          target: '_blank',
          rel: 'home'
        },
        'Home'
      ),
    key: 'home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: 'Introduction',
    key: '/en-US/os-theme/docs/introduction',
    icon: renderIcon(DocumentTextIcon)
  },
  {
    label: 'Components',
    key: '/en-US/os-theme/components',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: 'Card',
        key: '/en-US/os-theme/components/card'
      },
      {
        label: 'Collapse',
        key: '/en-US/os-theme/components/collapse'
      }
    ]
  }
]

export default {
  setup () {
    return {
      menuOptions,
      renderMenuLabel (option) {
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
