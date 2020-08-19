# Icon
```html
<n-button @click="emitMessage">
  Hourglass Icon
</n-button>
```
```js
import mdHourglass from 'naive-ui/lib/icons/md-hourglass'

export default {
  data() {
    return {}
  },
  methods: {
    emitMessage() {
      this.$NMessage.warning("I never needed anybody's help in any way", {
        icon: h => h(mdHourglass)
      })
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0
}
```