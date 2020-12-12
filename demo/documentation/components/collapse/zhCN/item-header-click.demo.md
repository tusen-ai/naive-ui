# 点击标题

```html
<n-collapse
  v-model:expandedNames="activeNames"
  @item-header-click="handleItemHeaderClick"
>
  <n-collapse-item name="1">
    <template v-slot:header> 青铜 </template>
    <div>可以</div>
  </n-collapse-item>
  <n-collapse-item name="2">
    <template v-slot:header> 白银 </template>
    <div>很好</div>
  </n-collapse-item>
  <n-collapse-item name="3">
    <template v-slot:header> 黄金 </template>
    <div>真棒</div>
  </n-collapse-item>
</n-collapse>
```

```js
export default {
  inject: ['message'],
  data () {
    return {
      activeNames: []
    }
  },
  methods: {
    handleItemHeaderClick ({ name, expanded }) {
      this.message.info(`Name: ${name}, Expanded: ${expanded}`)
    }
  }
}
```
