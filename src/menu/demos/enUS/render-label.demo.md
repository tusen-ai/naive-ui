# Render Label

The `renderLabel` can be used to batch process the `label` we pass in in `options`.

```html
<n-menu :options="menuOptions" :render-label="renderMenuLabel" />
```

```js
import { h } from 'vue'
import { RouterLink } from 'vue-router'

const menuOptions = [
  {
    label: 'Home',
    key: '/'
  },
  {
    label: 'Introduction',
    key: '/en-US/os-theme/docs/introduction'
  },
  {
    label: 'Components',
    key: '/en-US/os-theme/components'
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
