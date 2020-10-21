# Click on Item Header
```html
<n-collapse
  v-model:expandedNames="activeNames"
  @item-header-click="handleItemHeaderClick"
>
  <n-collapse-item name="1">
    <template v-slot:header>
      Bronze
    </template>
    <div>Okay</div>
  </n-collapse-item>
  <n-collapse-item name="2">
    <template v-slot:header>
      Silver
    </template>
    <div>Good</div>
  </n-collapse-item>
  <n-collapse-item name="3">
    <template v-slot:header>
      Gold
    </template>
    <div>Excellent</div>
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
    handleItemHeaderClick ({
      name,
      expanded
    }) {
      this.message.info(`Name: ${name}, Expanded: ${expanded}`)
    }
  }
}
```