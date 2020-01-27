# Placement
Use different placement.
```html
<n-dropdown @select="handleSelect" placement="bottom-start" :focusable="false" :options="options">
  <n-button>Money Force Us to Work Rather Than Sleep</n-button>
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