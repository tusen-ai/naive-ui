# 高亮

在你使用高亮之前，请看本页开始的注意事项，那些对于确保这个例子按预期展示是很重要的。

```html
<n-log
  :log="log"
  @require-top="handlerequireTop"
  @require-bottom="handlerequireBottom"
  :loading="loading"
  language="naive-log"
  trim
/>
```

```js
function log () {
  const l = []
  for (let i = 0; i < 40; ++i) {
    l.push(Math.random().toString(16))
  }
  return l.join('\n') + '\n'
}

export default {
  data () {
    return {
      loading: false,
      log: log()
    }
  },
  methods: {
    clear () {
      this.log = ''
    },
    handlerequireTop () {
      if (this.loading) return
      this.loading = true
      setTimeout(() => {
        this.log = log() + this.log
        this.loading = false
      }, 1000)
    },
    handlerequireBottom () {
      if (this.loading) return
      this.loading = true
      setTimeout(() => {
        this.log = this.log + log()
        this.loading = false
      }, 1000)
    }
  }
}
```
