# Text Button
Somebody also calls it `link` button.
```html
<n-button
  text
  size="large"
>
  <template v-slot:icon>
    <n-icon>
      <train-outline />
    </n-icon>
  </template>
  The Engine is Still Spiting Smoke
</n-button>
```
```js
import trainOutline from 'naive-ui/lib/icons/train-outline'

export default {
  components: {
    trainOutline
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```
