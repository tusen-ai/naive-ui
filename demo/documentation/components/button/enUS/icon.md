# Icon
Using icon in button
```html
<n-button>
  <template v-slot:icon>
    <md-save />
  </template>
  Save
</n-button>
<n-button icon-position="right">
  <template v-slot:icon>
    <md-save />
  </template>
  Save
</n-button>
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