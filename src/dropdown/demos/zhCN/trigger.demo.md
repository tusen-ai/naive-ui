# 触发

下拉菜单不同的触发方式。

```html
<n-space>
  <n-dropdown @select="handleSelect" trigger="hover" :options="options">
    <n-button :keyboard="false">悬浮！</n-button>
  </n-dropdown>
  <n-dropdown @select="handleSelect" trigger="click" :options="options">
    <n-button :keyboard="false">点击！</n-button>
  </n-dropdown>
  <n-dropdown @select="handleSelect" :show="showDropdown" :options="options">
    <n-button :keyboard="false" @click="handleClick"
      >噢！我要自己手动！</n-button
    >
  </n-dropdown>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const showDropdownRef = ref(false)
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
      showDropdown: showDropdownRef,
      handleSelect (key) {
        message.info(key)
      },
      handleClick () {
        showDropdownRef.value = !showDropdownRef.value
      }
    }
  }
})
```
