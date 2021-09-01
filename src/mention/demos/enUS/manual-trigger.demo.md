# Manually Trigger Focus and Blur

Maybe you want to trigger `focus` and `blur` manually.

```html
<n-space>
  <n-mention :options="options" default-value="@" ref="myMention" />
  <n-button @click="triggerFocus"
    >Click to focus, and will blur after one second</n-button
  >
</n-space>
```

```js
import { defineComponent, h, ref } from 'vue'
import { NIcon } from 'naive-ui'
import { HomeOutline as HomeIcon } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    const myMentionRef = ref(null)
    const triggerFocus = () => {
      myMentionRef.value.focus()
      setTimeout(triggerBlur, 1000)
    }
    const triggerBlur = () => {
      myMentionRef.value.blur()
    }
    return {
      myMention: myMentionRef,
      triggerFocus,
      triggerBlur,
      options: [
        {
          label: '07akioni',
          value: '07akioni'
        },
        {
          label: 'star-kirby',
          value: 'star-kirby'
        },
        {
          label: 'Guandong-Road',
          value: 'Guandong-Road'
        },
        {
          label: (option) =>
            h('span', { style: 'display: flex; align-items: center;' }, [
              h(
                NIcon,
                { style: 'margin-right: 5px' },
                { default: () => h(HomeIcon) }
              ),
              option.value
            ]),
          value: 'No.5-Yiheyuan-Road'
        }
      ]
    }
  }
})
```
