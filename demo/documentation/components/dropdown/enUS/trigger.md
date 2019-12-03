# Trigger
```html
<n-dropdown @select="handleSelect" trigger="hover">
  <template v-slot:activator>
    <n-button>I want to hover!</n-button>
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
    <n-button>I want to click!</n-button>
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
    <n-button @click="handleClick">Oh! By Myself!</n-button>
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