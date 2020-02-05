# Disabled
Button can be disabled.
```html
<n-button
  size="small"
  disabled
>
  Disabled
</n-button>
<n-button
  disabled
  type="primary"
>
  Disabled
</n-button>
<n-button
  disabled
  round
  type="primary"
>
  Disabled
</n-button>
<n-button
  disabled
  circle
>
  <template v-slot:icon>
    <md-save />
  </template>
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
