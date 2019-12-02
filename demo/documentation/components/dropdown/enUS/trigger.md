# Basic
```html
<n-dropdown @select="handleSelect" trigger="hover">
  <template v-slot:activator>
    <n-button>I want to hover!</n-button>
  </template>
  <n-dropdown-item
    v-for="hotel in hotels"
    :key="hotel"
    :name="hotel.toLowerCase()"
  >
    {{ hotel }}
  </n-dropdown-item>
</n-dropdown>

<n-dropdown @select="handleSelect" trigger="click">
  <template v-slot:activator>
    <n-button>I want to click!</n-button>
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

```css
.n-button {
  margin: 0 8px 12px 0;
}
```