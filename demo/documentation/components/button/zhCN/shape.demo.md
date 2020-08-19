# 形状
按钮拥有不同的形状。
```html
<n-button circle>
  <template v-slot:icon>
    <cash-outline />
  </template>
</n-button>
<n-button round>圆角</n-button>
<n-button>方</n-button>
```
```js
import cashOutline from 'naive-ui/lib/icons/cash-outline'

export default {
  components: {
    cashOutline
  }
}
```
```css
.n-button {
  margin: 0 8px 8px 0;
}
```