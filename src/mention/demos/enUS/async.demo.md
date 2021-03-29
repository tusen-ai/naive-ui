# Load Remote Options

Load options async.

```html
<n-mention
  :options="options"
  default-value="@"
  @search="handleSearch"
  :loading="loading"
/>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const optionsRef = ref([])
    const loadingRef = ref(false)
    let searchTimerId = null
    return {
      options: optionsRef,
      loading: loadingRef,
      handleSearch (pattern, prefix) {
        if (searchTimerId !== null) clearTimeout(searchTimerId)
        console.log(pattern, prefix)
        loadingRef.value = true
        searchTimerId = setTimeout(() => {
          optionsRef.value = [
            'We',
            'all',
            'live',
            'in',
            'a',
            'yellow',
            'submarine'
          ].map((v) => ({
            label: pattern + v,
            value: pattern + v
          }))
          loadingRef.value = false
        }, 1500)
      }
    }
  }
})
```
