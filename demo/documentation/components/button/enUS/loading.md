# Loading
Button has loading status.
```html
<n-button
  :loading="loading"
  icon-placement="right"
  @click="loading = !loading"
>
  Click Me
</n-button>
```

```js
import cashOutline from 'naive-ui/lib/icons/cash-outline'

export default {
  components: {
    cashOutline
  },
  data () {
    return {
      loading: false
    }
  }
}
```
```css
.n-button {
  margin: 0 8px 8px 0;
}
```
