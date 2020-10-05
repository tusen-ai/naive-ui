# Basic
```html
<n-transfer
  ref="transfer"
  v-model:value="value"
  :options="options"
/>
<n-button @click="regenOptions">
  Regen Options
</n-button>
<n-button @click="regenValues">
  Regen Values
</n-button>
<!-- <pre class="n-doc-section__inspect">{{ JSON.stringify(value) }}</pre>
<pre class="n-doc-section__inspect">{{ $refs.transfer ? $refs.transfer.memorizedSourceOptions.map(option => option.value) : null }}</pre>
<pre class="n-doc-section__inspect">{{ $refs.transfer ? $refs.transfer.targetOptions.map(option => option.value) : null }}</pre> -->
```
```js
let prefix = null

function genOptions () {
  prefix = Math.random().toString(36).slice(2, 5)
  return Array.apply(null, { length: 200 }).map((v, i) => ({
    label: prefix + 'Option' + i,
    value: prefix + i,
    disabled: i % 5 === 0
  }))
}

function genValues () {
  return Array.apply(null, { length: 100 }).map((v, i) => prefix + i)
}

export default {
  data () {
    return {
      options: genOptions(),
      value: genValues()
    }
  },
  mounted () {
  },
  methods: {
    regenOptions () {
      this.options = genOptions()
    },
    regenValues () {
      this.value = genValues()
    }
  }
}
```