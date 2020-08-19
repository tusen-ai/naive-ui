# Shape
Button has different shapes.
```html
<n-button circle>
  <template v-slot:icon>
    <cash-outline />
  </template>
</n-button>
<n-button round>Round</n-button>
<n-button>Rect</n-button>
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