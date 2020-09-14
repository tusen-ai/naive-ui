# 图标
```html
<n-button @click="createMessage">
  漏斗图标
</n-button>
```
```js
import { h } from 'vue'
import mdHourglass from 'naive-ui/lib/icons/md-hourglass'

export default {
  inject: ['message'],
  methods: {
    createMessage() {
      this.message.warning("I never needed anybody's help in any way", {
        icon: () => h(mdHourglass)
      })
    }
  }
}
```