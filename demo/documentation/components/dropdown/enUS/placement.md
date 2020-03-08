# Placement
Use different placement.
```html
<n-dropdown @select="handleSelect" placement="bottom-start" :options="options">
  <n-button :keyboard="false">Money Force Us to Work Rather Than Sleep</n-button>
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