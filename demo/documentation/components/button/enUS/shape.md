# Shape
Button has different shapes.
```html
<n-button circle>
  <template v-slot:icon>
    <md-save />
  </template>
</n-button>
<n-button type="primary" round>Primary</n-button>
<n-button type="info">Info</n-button>
```
```js
import mdSave from 'naive-ui/packages/icons/md-save'

export default {
  components: {
    mdSave
  }
}
```
```css
.n-button {
  margin: 0 8px 8px 0;
}
```