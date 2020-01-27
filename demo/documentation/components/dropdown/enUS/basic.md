# Basic
Basic usage of dropdown
```html
<n-dropdown @select="handleSelect" :focusable="false" :options="options">
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
          key: 'marina bay sands'
        },
        {
          label: 'Brown\'s Hotel, London',
          key: 'brown\'s hotel, london'
        },
        {
          label: 'Atlantis Bahamas, Nassau',
          key: 'atlantis nahamas, nassau'
        },
        {
          label: 'The Beverly Hills Hotel, Los Angeles',
          key: 'the beverly hills hotel, los angeles'
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