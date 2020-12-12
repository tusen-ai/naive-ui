# Remote(Single)

Async example for single select.

```html
<n-select
  v-model:value="value"
  filterable
  placeholder="Search Songs"
  :options="options"
  :loading="loading"
  clearable
  remote
  @search="handleSearch"
/>
```

```js
const options = [
  {
    label: 'Drive My Car',
    value: 'song1'
  },
  {
    label: 'Norwegian Wood',
    value: 'song2'
  },
  {
    label: "You Won't See",
    value: 'song3'
  },
  {
    label: 'Nowhere Man',
    value: 'song4'
  },
  {
    label: 'Think For Yourself',
    value: 'song5'
  },
  {
    label: 'The Word',
    value: 'song6'
  },
  {
    label: 'Michelle',
    value: 'song7'
  },
  {
    label: 'What goes on',
    value: 'song8'
  },
  {
    label: 'Girl',
    value: 'song9'
  },
  {
    label: "I'm looking through you",
    value: 'song10'
  },
  {
    label: 'In My Life',
    value: 'song11'
  },
  {
    label: 'Wait',
    value: 'song12'
  }
]

export default {
  data() {
    return {
      value: null,
      loading: false,
      options: [],
      noDataContent: 'please search',
      handleSearch: (query) => {
        if (!query.length) {
          this.options = []
          this.noDataContent = 'please search'
          return
        }
        this.loading = true
        window.setTimeout(() => {
          this.options = options.filter((item) => ~item.label.indexOf(query))
          if (!this.options.length) this.noDataContent = 'no result found'
          this.loading = false
        }, 1000)
      }
    }
  }
}
```
