# 触发
```html
<n-dropdown @select="handleSelect" trigger="hover">
  <template v-slot:activator>
    <n-button>悬停</n-button>
  </template>
  <n-dropdown-item
    v-for="hotel in hotels"
    :key="hotel"
    :name="hotel.toLowerCase()"
    :label="hotel"
  />
</n-dropdown>

<n-dropdown @select="handleSelect" trigger="click" :focusable="false">
  <template v-slot:activator>
    <n-button>点击</n-button>
  </template>
  <n-dropdown-item
    v-for="hotel in hotels"
    :key="hotel"
    :name="hotel.toLowerCase()"
    :label="hotel"
  />
</n-dropdown>

<n-dropdown @select="handleSelect" trigger="manual" v-model="showDropdown">
  <template v-slot:activator>
    <n-button @click="handleClick">手动</n-button>
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
      ],
      showDropdown: false
    }
  },
  methods: {
    handleSelect (name) {
      this.$NMessage.info(name)
    },
    handleClick () {
      this.showDropdown = !this.showDropdown
    }
  }
}
```

```css
.n-button {
  margin: 0 8px 12px 0;
}
```
