# Scroll

You can easily make log scroll to top or bottom. Also you can make the scroll action silent (don't trigger events of Log in this scroll action).

```html
<n-button-group>
  <n-button @click="scrollTo('bottom', false)">Scroll To Bottom</n-button>
  <n-button @click="scrollTo('bottom', true)">Scroll To Bottom (silent)</n-button>
  <n-button @click="scrollTo('top', false)">Scroll To Top</n-button>
  <n-button @click="scrollTo('top', true)">Scroll To Top (silent)</n-button>
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

