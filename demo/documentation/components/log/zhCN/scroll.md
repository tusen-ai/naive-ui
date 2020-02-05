# 滚动
你可以很简单的让 Log 滚到顶部或者底部。同时你可以控制这个滚动操作是否发出事件。

```html
<n-button-group>
  <n-button @click="scrollTo('bottom', false)">滚动到底部</n-button>
  <n-button @click="scrollTo('bottom', true)">滚动到底部（无事件）</n-button>
  <n-button @click="scrollTo('top', false)">滚动到顶部</n-button>
  <n-button @click="scrollTo('top', true)">滚动到顶部（无事件）</n-button>
</n-button-group>
<n-log
  ref="log"
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
  return l.join("\n") + "\n"
}

export default {
  data() {
    return {
      loading: false,
      log: log()
    }
  },
  methods: {
    clear() {
      this.log = ""
    },
    handleRequireMore(from) {
      this.$NMessage.info("Require More from " + from)
      if (this.loading) return
      this.loading = true
      setTimeout(() => {
        if (from === "top") {
          this.log = log() + this.log
        } else if (from === "bottom") {
          this.log = this.log + log()
        }
        this.loading = false
      }, 1000)
    },
    handleReachTop() {
      this.$NMessage.info("Reach Top")
    },
    handleReachBottom() {
      this.$NMessage.info("Reach Bottom")
    },
    scrollTo(to, dismissEvent = false) {
      if (to === "bottom") {
        this.$refs.log.scrollToBottom(dismissEvent)
      } else {
        this.$refs.log.scrollToTop(dismissEvent)
      }
    }
  }
}
```
```css
.n-button-group { 
  margin-bottom: 12px;
}
```
