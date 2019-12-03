# Basic
```html
<n-dropdown @select="handleSelect" :focusable="false">
  <template v-slot:activator>
    <n-button>Money Force Us to Work Rather Than Sleep</n-button>
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
        'Marina Bay Sands, Singapore', 'Brown’s Hotel, London', 'Atlantis Bahamas, Nassau', 'The Beverly Hills Hotel, Los Angeles'
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