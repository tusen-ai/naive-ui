# 图标
```html
<n-message-controller ref="message" />
<n-button @click="createMessage">
  漏斗图标
</n-button>
```
```js
import { h } from 'vue'
import mdHourglass from 'naive-ui/lib/icons/md-hourglass'

export default {
  methods: {
    createMessage() {
      this.$refs.message.warning("I never needed anybody's help in any way", {
        icon: () => h(mdHourglass)
      })
    }
  }
}
```