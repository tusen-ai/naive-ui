# Icon
Use icon in button.
```html
<n-button>
  <template v-slot:icon>
    <md-save />
  </template>
  Save
</n-button>
<n-button icon-placement="right">
  <template v-slot:icon>
    <md-save />
  </template>
  Save
</n-button>
```
```js
import mdSave from 'naive-ui/lib/icons/md-save'

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
