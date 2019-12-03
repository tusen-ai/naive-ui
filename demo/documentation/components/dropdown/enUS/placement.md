# Placement
```html
<n-dropdown @select="handleSelect" placement="bottom-start" :focusable="false">
  <template v-slot:activator>
    <n-button>Money Force Us to Work Rather Than Sleep</n-button>
  </template>
  <n-dropdown-item
    v-for="hotel in hotels"
    :key="hotel"
    :name="hotel.toLowerCase()"
  >
    {{ hotel }}
  </n-dropdown-item>
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