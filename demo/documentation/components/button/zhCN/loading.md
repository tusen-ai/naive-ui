# 加载中
按钮有加载状态。
```html
<n-button
  :loading="loading"
  @click="loading = !loading"
>
  点我
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
