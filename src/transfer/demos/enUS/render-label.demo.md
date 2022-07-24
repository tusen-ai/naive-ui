# Customize label rendering

It can be changed into address book, menu, etc. there are many application scenarios.

```html
<n-transfer
  ref="transfer"
  v-model:value="value"
  :options="options"
  :renderLabel="renderLabel"
/>
```

```js
import { defineComponent, ref, h } from 'vue'
import { NAvatar } from 'naive-ui'

const options = [
  {
    label: '07akioni',
    value: 'https://avatars.githubusercontent.com/u/18677354?s=60&v=4'
  },
  {
    label: 'amadeus711',
    value: 'https://avatars.githubusercontent.com/u/46394163?s=60&v=4'
  },
  {
    label: 'Talljack',
    value: 'https://avatars.githubusercontent.com/u/34439652?s=60&v=4'
  },
  {
    label: 'JiwenBai',
    value: 'https://avatars.githubusercontent.com/u/43430022?s=60&v=4'
  },
  {
    label: 'songjianet',
    value: 'https://avatars.githubusercontent.com/u/19239641?s=60&v=4'
  }
]

export default defineComponent({
  setup () {
    return {
      options,
      value: ref([options[0].value]),
      renderLabel: function ({ from, option }) {
        return h(
          'div',
          {
            style: {
              display: 'flex',
              margin: from === 'source' ? undefined : '5px 0'
            }
          },
          {
            default: () => [
              from === 'source'
                ? undefined
                : h(NAvatar, {
                  round: true,
                  src: option.value,
                  size: 'small',
                  fallbackSrc:
                      'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
                }),
              h(
                'div',
                {
                  style: {
                    display: 'flex',
                    marginLeft: from === 'source' ? undefined : '5px',
                    alignSelf: 'center'
                  }
                },
                { default: () => option.label }
              )
            ]
          }
        )
      }
    }
  }
})
```
