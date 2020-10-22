# Loading
```html
<n-switch v-model:value="loading" />
<n-log
  :loading="loading"
  :log="log"
/>
```

```js
function log () {
  const l = []
  for (let i = 0; i < 40; ++i) {
    l.push((Math.random()).toString(16))
  }
  return l.join('\n') + '\n'
}

export default {
  data () {
    return {
      loading: false,
      log: log()
    }
  }
}
```