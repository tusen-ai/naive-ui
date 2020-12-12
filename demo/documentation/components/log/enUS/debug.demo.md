# Debug

```html
<n-card
  title="Random String Logs"
  :segmented="{
  header: 'soft',
  content: 'hard'
}"
>
  <n-log
    style="margin-top: -12px; margin-bottom: -12px;"
    :log="log"
    @require-more="handleRequireMore"
    :loading="loading"
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
    handleRequireMore (from) {
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
    }
  }
}
```
