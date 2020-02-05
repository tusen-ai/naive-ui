# 加载中
按钮有加载状态。
```html
<n-button
  :loading="loading"
  @click="loading = !loading"
>
  <template v-slot:icon>
    <md-save />
  </template>
  加载中
</n-button>
<br>
<n-button
  :loading="loading"
  icon-placement="right"
  @click="loading = !loading"
>
  <template v-slot:icon>
    <md-save />
  </template>
  加载中
</n-button>
<br>
<n-button
  :loading="loading"
  size="small"
  @click="loading = !loading"
>
  加载中
</n-button>
<br>
<n-button
  :loading="loading"
  size="large"
  @click="loading = !loading"
>
  加载中
</n-button>
<br>
<n-button
  :loading="loading"
  type="primary"
  size="large"
  round
  @click="loading = !loading"
>
  加载中
</n-button>
```

```js
import mdSave from 'naive-ui/lib/icons/md-save'

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
