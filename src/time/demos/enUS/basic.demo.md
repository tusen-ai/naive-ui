# Basic

```html
<n-time :time="0" />
<br />
<n-time :time="time" />
```

```js
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      time: new Date(0)
    }
  }
})
```
