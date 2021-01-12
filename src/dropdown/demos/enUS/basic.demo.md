# Basic

Basic usage of dropdown

```html
<n-dropdown trigger="hover" @select="handleSelect" :options="options">
  <n-button :keyboard="false"
    >Money Force Us to Work Rather Than Sleep</n-button
  >
</n-dropdown>
```

```js
export default {
  inject: ['message'],
  data () {
    return {
      options: [
        {
          label: 'Marina Bay Sands',
          key: 'marina bay sands'
        },
        {
          label: "Brown's Hotel, London",
          key: "brown's hotel, london"
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
      this.message.info(key)
    }
  }
}
```
