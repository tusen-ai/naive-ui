# Trigger
```html
<n-dropdown
  trigger="hover"
  style="margin-right: 16px;"
>
  <template v-slot:activator>
    <div>Trigger: hover</div>
  </template>
  <n-dropdown-item
    v-for="item in items"
    :key="item"
    @click="handleClick(item)"
  >
    {{ item }}
  </n-dropdown-item>
</n-dropdown>
<n-dropdown trigger="click">
  <template v-slot:activator>
    <div>Trigger: click</div>
  </template>
  <n-dropdown-item
    v-for="item in items"
    :key="item"
    @click="handleClick(item)"
  >
    {{ item }}
  </n-dropdown-item>
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