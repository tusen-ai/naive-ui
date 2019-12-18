# Loading
```html
<n-switch v-model="loading" />
<n-card title="Random String Logs" :segmented="{
  header: 'soft',
  content: 'hard'
}">
  <n-log
    style="margin-top: -12px; margin-bottom: -12px;"
    :loading="loading"
    :log="log"
  />
  <template v-slot:action>
    Loading?
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
      loading: false,
      log: log()
    }
  }
}
```