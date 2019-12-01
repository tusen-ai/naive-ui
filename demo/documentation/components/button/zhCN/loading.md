# 加载中
按钮有加载状态。
```html
<n-button
  icon="md-save"
  :loading="loading"
  @click="loading = !loading"
>
  Loading
</n-button>
<n-button
  icon="md-save"
  :loading="loading"
  icon-position="right"
  @click="loading = !loading"
>
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
export default {
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
