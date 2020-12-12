# Trigger

Different trigger of dropdown.

```html
<n-space>
  <n-dropdown @select="handleSelect" trigger="hover" :options="options">
    <n-button :keyboard="false">Hover!</n-button>
  </n-dropdown>
  <n-dropdown @select="handleSelect" trigger="click" :options="options">
    <n-button :keyboard="false">Click!</n-button>
  </n-dropdown>
  <n-dropdown @select="handleSelect" :show="showDropdown" :options="options">
    <n-button :keyboard="false" @click="handleClick"
      >Oh! Manually By Myself!</n-button
    >
  </n-dropdown>
</n-space>
```

```js
export default {
  inject: ['message'],
  data() {
    return {
      options: [
        {
          label: 'Marina Bay Sands',
          key: 'Marina Bay Sands'
        },
        {
          label: "Brown's Hotel, London",
          key: "Brown's Hotel, London"
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
    handleSelect(name) {
      this.message.info(name)
    },
    handleClick() {
      this.showDropdown = !this.showDropdown
    }
  }
}
```
