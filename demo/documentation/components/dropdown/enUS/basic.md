# Basic
```html
<n-dropdown>
  <template v-slot:activator>
    <div>menu</div>
  </template>
  <n-dropdown-item
    v-for="item in items"
    :key="item"
    @click="handleClick(item)"
    :label="item"
  />
</n-dropdown>
```
```js
export default {
  data () {
    return {
      items: ['item1longlonglong', 'item2longlonglong', 'item3longlonglong', 'item4longlonglong']
    }
  },
  methods: {
    handleClick (item) {
      this.$NMessage.info(item)
    }
  }
}
```