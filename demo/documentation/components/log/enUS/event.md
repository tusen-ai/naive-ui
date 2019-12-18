# Event
Log has `require-more`, `reach-top` and `reach-bottom` event. Note that even if logs are scrolled to top or bottom, when you wheel to the same direction, `require-more` will still be triggered. If you don't want to trigger handler when logs are at top or bottom. Use `reach-top` or `reach-bottom` instead.
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
  },
  methods: {
    clear () {
      this.log = ''
    },
    handleRequireMore (from) {
      this.$NMessage.info('Require More from ' + from)
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
    handleReachTop () {
      this.$NMessage.info('Reach Top')
    },
    handleReachBottom () {
      this.$NMessage.info('Reach Bottom')
    }
  }
}
```