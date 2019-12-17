# Basic
```html
<n-card title="Random String Logs" :segmented="{
  header: 'soft',
  content: 'hard'
}">
  <n-log
    style="margin-top: -12px; margin-bottom: -12px;"
    :log="log"
    @reach-top="handleReachTop"
    @reach-bottom="handleReachBottom"
    :bottom-loading="bottomLoading"
    :top-loading="topLoading"
    trim
  />
  <template v-slot:action>
    <n-button @click="clear">Clear</n-button>
  </template>
</n-card>
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
      topLoading: false,
      bottomLoading: false,
      log: log()
    }
  },
  computed: {
    loading () {
      return this.topLoading || this.bottomLoading
    }
  },
  methods: {
    clear () {
      this.log = ''
    },
    handleReachTop () {
      if (this.topLoading) return
      this.topLoading = true
      setTimeout(() => {
        this.log = log() + this.log
        this.topLoading = false
      }, 1000)
    },
    handleReachBottom () {
      if (this.bottomLoading) return
      this.bottomLoading = true
      setTimeout(() => {
        this.log = this.log + log()
        this.bottomLoading = false
      }, 1000)
    }
  }
}
```