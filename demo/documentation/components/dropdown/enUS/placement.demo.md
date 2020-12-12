# Placement

Use different placement.

```html
<n-dropdown
  trigger="hover"
  @select="handleSelect"
  placement="bottom-start"
  :options="options"
>
  <n-button :keyboard="false"
    >Money Force Us to Work Rather Than Sleep</n-button
  >
</n-dropdown>
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
      ]
    }
  },
  methods: {
    handleSelect(name) {
      this.message.info(name)
    }
  }
}
```
