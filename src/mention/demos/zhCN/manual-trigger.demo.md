# 手动触发

可能你想要手动触发 `focus` 和 `blur` 事件。

```html
<n-space>
  <n-mention :options="options" default-value="@" ref="myMention" />
  <n-button @click="triggerFocus">点击聚焦，一秒后失去焦点</n-button>
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
          label: '广东路',
          value: '广东路'
        },
        {
          label: (option) =>
            h('div', { style: 'display: flex; align-items: center;' }, [
              h(
                NIcon,
                { style: 'margin-right: 5px' },
                { default: () => h(HomeIcon) }
              ),
              option.value
            ]),
          value: '颐和园路5号'
        }
      ]
    }
  }
})
```
