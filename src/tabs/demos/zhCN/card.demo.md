# 和卡片一起使用

一个和卡片一起使用的例子（例子本身是卡片）。

```html
<n-tabs
  v-model:value="name"
  type="card"
  closable
  @close="handleClose"
  @scrollable-change="handleScrollableChange"
  :nav-style="{
    borderTop: 'none',
    margin: '0 -24px',
    padding: `4px ${tabNavScrollable ? 0 : 24}px`
  }"
>
  <n-tab-pane
    v-for="panel in panels"
    :key="panel"
    :label="panel.toString()"
    :name="panel.toString()"
  >
    {{ panel }}
  </n-tab-pane>
</n-tabs>
```

```js
export default {
  inject: ['message'],
  data () {
    return {
      panels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      name: '1',
      tabNavScrollable: false
    }
  },
  methods: {
    handleScrollableChange (value) {
      this.tabNavScrollable = value
    },
    handleClose (name) {
      this.message.info('Close ' + name)
      const index = this.panels.findIndex((v) => name === v.toString())
      if (~index) {
        this.panels.splice(index, 1)
      }
    }
  }
}
```
