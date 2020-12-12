# 事件

Log 有 `require-more`、`reach-top` 和 `reach-bottom` 事件。需要注意的是即使 Log 已经滚到了头或者尾，你继续滚动鼠标的时候，`require-more` 还是会被触发，而 `reach-xxx` 并不会。如果你不需要这种特性，可以使用 `reach-top` 或者 `reach-bottom`。

```html
<n-log
  :log="log"
  @require-more="handleRequireMore"
  @reach-top="handleReachTop"
  @reach-bottom="handleReachBottom"
  :loading="loading"
  trim
/>
```

```js
function log() {
  const l = []
  for (let i = 0; i < 10; ++i) {
    l.push(Math.random().toString(16))
  }
  return l.join('\n') + '\n'
}

export default {
  inject: ['message'],
  data() {
    return {
      loading: false,
      log: log()
    }
  },
  methods: {
    clear() {
      this.log = ''
    },
    handleRequireMore(from) {
      this.message.info('Require More from ' + from)
      if (this.loading) return
      this.loading = true
      setTimeout(() => {
        if (from === 'top') {
          this.log = log() + this.log
        } else if (from === 'bottom') {
          this.log = this.log + log()
        }
        this.loading = false
      }, 1000)
    },
    handleReachTop() {
      this.message.info('Reach Top')
    },
    handleReachBottom() {
      this.message.info('Reach Bottom')
    }
  }
}
```
