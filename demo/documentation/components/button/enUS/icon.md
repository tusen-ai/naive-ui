# Icon
Use icon in button.
```html
<n-button>
  <template v-slot:icon>
    <cash-outline />
  </template>
  +100$
</n-button>
<n-button icon-placement="right">
  <template v-slot:icon>
    <cash-outline />
  </template>
  +100$
</n-button>
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
