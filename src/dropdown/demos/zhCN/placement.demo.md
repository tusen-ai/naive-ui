# 弹出位置

使用不同的弹出位置。

```html
<n-dropdown
  trigger="hover"
  @select="handleSelect"
  placement="bottom-start"
  :options="options"
>
  <n-button :keyboard="false">金钱所迫，起床工作</n-button>
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
          key: 'marina bay sands'
        },
        {
          label: '布朗酒店，伦敦',
          key: "brown's hotel, london"
        },
        {
          label: '亚特兰蒂斯巴哈马，拿骚',
          key: 'atlantis nahamas, nassau'
        },
        {
          label: '比佛利山庄酒店，洛杉矶',
          key: 'the beverly hills hotel, los angeles'
        }
      ],
      handleSelect (key) {
        message.info(key)
      }
    }
  }
})
```
