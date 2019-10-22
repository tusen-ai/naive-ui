# Card
```html
<n-tabs
  v-model="name"
  type="card"
  closable
  @close="handleClose"
>
  <n-tab-panel
    v-for="panel in panels"
    :key="panel"
    :label="panel.toString()"
    :name="panel.toString()"
  >
    {{ panel }}
  </n-tab-panel>
</n-tabs>
```
```js
export default {
  data () {
    return {
      panels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      name: '1'
    }
  },
  methods: {
    handleClose (name) {
      this.$NMessage.info('Close ' + name)
      const index = this.panels.findIndex(v => name === v.toString())
      if (~index) {
        this.panels.splice(index, 1)
      }
    }
  }
}
```