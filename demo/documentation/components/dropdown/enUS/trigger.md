# Trigger
Different trigger of dropdown.
```html
<n-dropdown @select="handleSelect" trigger="hover" :options="options">
  <n-button>Hover! On the Green Light!</n-button>
</n-dropdown>

<n-dropdown @select="handleSelect" trigger="click" :focusable="false" :options="options">
  <n-button>Click! On the Green Light</n-button>
</n-dropdown>

<n-dropdown @select="handleSelect" trigger="manual" :show="showDropdown" :options="options">
  <n-button @click="handleClick">Oh! Manually By Myself!</n-button>
</n-dropdown>
```
```js
export default {
  data () {
    return {
      options: [
        {
          label: 'Marina Bay Sands',
          key: 'Marina Bay Sands'
        },
        {
          label: 'Brown\'s Hotel, London',
          key: 'Brown\'s Hotel, London'
        },
        {
          label: 'Atlantis Bahamas, Nassau',
          key: 'Atlantis Bahamas, Nassau'
        },
        {
          label: 'The Beverly Hills Hotel, Los Angeles',
          key: 'The Beverly Hills Hotel, Los Angeles'
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