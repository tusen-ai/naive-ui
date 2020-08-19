# Trigger
Different trigger of dropdown.
```html
<n-dropdown @select="handleSelect" trigger="hover" :options="options">
  <n-button :keyboard="false">Hover!</n-button>
</n-dropdown>

<n-dropdown @select="handleSelect" trigger="click" :options="options">
  <n-button :keyboard="false">Click!</n-button>
</n-dropdown>

<n-dropdown @select="handleSelect" trigger="manual" :show="showDropdown" :options="options">
  <n-button :keyboard="false" @click="handleClick">Oh! Manually By Myself!</n-button>
</n-dropdown>
```
```js
export default {
  data () {
    return {
      options: [
        {
          label: 'Marina Bay Sands',
          value: 'Marina Bay Sands'
        },
        {
          label: 'Brown\'s Hotel, London',
          value: 'Brown\'s Hotel, London'
        },
        {
          label: 'Atlantis Bahamas, Nassau',
          value: 'Atlantis Bahamas, Nassau'
        },
        {
          label: 'The Beverly Hills Hotel, Los Angeles',
          value: 'The Beverly Hills Hotel, Los Angeles'
        }
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