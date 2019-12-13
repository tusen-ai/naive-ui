# 基础
```html
<n-dropdown @select="handleSelect" :focusable="false">
  <template v-slot:activator>
    <n-button>金钱所迫，起床工作</n-button>
  </template>
  <n-dropdown-item
    v-for="hotel in hotels"
    :key="hotel"
    :name="hotel.toLowerCase()"
    :label="hotel"
  />
</n-dropdown>
```
```js
export default {
  data () {
    return {
      hotels: [
        '滨海湾金沙，新加坡', '布朗酒店，伦敦', '亚特兰蒂斯巴哈马，拿骚', '比佛利山庄酒店，洛杉矶'
      ]
    }
  },
  methods: {
    handleSelect (name) {
      this.$NMessage.info(name)
    }
  }
}
```
