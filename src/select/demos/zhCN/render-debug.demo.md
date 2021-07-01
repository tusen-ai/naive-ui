# Render Debug

```html
<n-select filterable v-model:value="value" :options="options" />
```

```js
import { h, defineComponent } from 'vue'
import { NTooltip } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      value: null,
      options: [
        {
          type: 'group',
          label: 'Rubber Soul',
          key: 'Rubber Soul',
          render: ({ node }) => {
            return h(NTooltip, null, {
              trigger: () => node,
              default: () => '用户需要这种功能我也很无奈1'
            })
          },
          children: [
            {
              label: () =>
                "Everybody's Got Something to Hide Except Me and My Monkey",
              value: 'song0',
              disabled: true
            },
            {
              label: 'Drive My Car',
              value: 'song1',
              render: ({ node }) => {
                return h(NTooltip, null, {
                  trigger: () => node,
                  default: () => '用户需要这种功能我也很无奈2'
                })
              }
            },
            {
              label: 'Norwegian Wood',
              value: 'song2'
            },
            {
              label: "You Won't See",
              value: 'song3',
              disabled: true
            },
            {
              label: 'Nowhere Man',
              value: 'song4'
            },
            {
              label: 'Think For Yourself',
              value: 'song5'
            },
            {
              label: 'The Word',
              value: 'song6'
            },
            {
              label: 'Michelle',
              value: 'song7',
              disabled: true
            },
            {
              label: 'What goes on',
              value: 'song8'
            },
            {
              label: 'Girl',
              value: 'song9'
            },
            {
              label: "I'm looking through you",
              value: 'song10'
            },
            {
              label: 'In My Life',
              value: 'song11'
            },
            {
              label: 'Wait',
              value: 'song12'
            }
          ]
        }
      ]
    }
  }
})
```
