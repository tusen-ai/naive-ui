# 点击事件

可能你想要在选项中自定义点击事件。

```html
<n-dropdown trigger="hover" @select="handleSelect" :options="options">
  <n-button>找个地方休息</n-button>
</n-dropdown>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      options: [
        {
          label: '滨海湾金沙，新加坡',
          key: 'marina bay sands',
          onClick: () => {
            message.success('Good!')
          }
        },
        {
          label: '布朗酒店，伦敦',
          key: "brown's hotel, london",
          onClick: () => {
            message.info('Okay')
          }
        },
        {
          label: '亚特兰蒂斯巴哈马，拿骚',
          key: 'atlantis nahamas, nassau'
        }
      ],
      handleSelect (key) {
        message.info(key)
      }
    }
  }
})
```
