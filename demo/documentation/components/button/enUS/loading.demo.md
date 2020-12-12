# Loading

Button has loading status.

```html
<n-button :loading="loading" icon-placement="left" @click="loading = !loading">
  Click Me
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
