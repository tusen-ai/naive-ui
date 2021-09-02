# Type

`date`, `datetime` or `relative`.

```html
<n-time :time="0" type="date" />
<br />
<n-time :time="time" type="datetime" />
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
