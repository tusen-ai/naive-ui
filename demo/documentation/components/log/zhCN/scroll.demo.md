# 滚动

你可以很简单的让 Log 滚到顶部或者底部。同时你可以控制这个滚动操作是否发出事件。

```html
<n-space vertical>
  <n-button-group>
    <n-button @click="scrollTo({ position: 'bottom', slient: false })"
      >滚动到底部</n-button
    >
    <n-button @click="scrollTo({ position: 'bottom', slient: true })"
      >滚动到底部（无事件）</n-button
    >
    <n-button @click="scrollTo({ position: 'top', slient: false })"
      >滚动到顶部</n-button
    >
    <n-button @click="scrollTo({ position: 'top', slient: true })"
      >滚动到顶部（无事件）</n-button
    >
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
</n-space>
```

```js
function log () {
  const l = []
  for (let i = 0; i < 10; ++i) {
    l.push(Math.random().toString(16))
  }
  return l.join('\n') + '\n'
}

export default {
  inject: ['message'],
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
    handleReachTop () {
      this.message.info('Reach Top')
    },
    handleReachBottom () {
      this.message.info('Reach Bottom')
    },
    scrollTo (...args) {
      this.$refs.log.scrollTo(...args)
    }
  }
}
```
