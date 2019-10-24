# Loading
Button has loading status.
```html
<n-button
  :loading="loading"
  @click="loading = !loading"
>
  <template v-slot:icon>
    <md-save />
  </template>
  Loading
</n-button>
<n-button
  :loading="loading"
  icon-position="right"
  @click="loading = !loading"
>
  <template v-slot:icon>
    <md-save />
  </template>
  Loading
</n-button>
<n-button
  :loading="loading"
  size="small"
  @click="loading = !loading"
>
  Loading
</n-button>
<n-button
  :loading="loading"
  size="large"
  @click="loading = !loading"
>
  Loading
</n-button>
<n-button
  :loading="loading"
  type="primary"
  size="large"
  round
  @click="loading = !loading"
>
  Loading
</n-button>
```

```js
import mdSave from 'naive-ui/packages/icons/md-save'

export default {
  components: {
    mdSave
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
