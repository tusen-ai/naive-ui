# Basic
Basic usage of dropdown
```html
<n-dropdown @select="handleSelect" :options="options">
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
          value: 'marina bay sands'
        },
        {
          label: 'Brown\'s Hotel, London',
          value: 'brown\'s hotel, london'
        },
        {
          label: 'Atlantis Bahamas, Nassau',
          value: 'atlantis nahamas, nassau'
        },
        {
          label: 'The Beverly Hills Hotel, Los Angeles',
          value: 'the beverly hills hotel, los angeles'
        }
      ]
    }
  },
  methods: {
    handleSelect (key) {
      this.$NMessage.info(key)
    }
  }
}
```