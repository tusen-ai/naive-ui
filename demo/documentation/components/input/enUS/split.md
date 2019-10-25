# Split
```html
<n-input split splitor="to" v-model="value">
  <template v-slot:affix>
    <n-icon><ios-calendar /></n-icon>
  </template>
</n-input>
<n-input split splitor="to" v-model="value">
  <template v-slot:suffix>
    <n-icon><ios-calendar /></n-icon>
  </template>
</n-input>
<n-input split splitor="to" v-model="value" clearable>
  <template v-slot:suffix>
    <n-icon><ios-calendar /></n-icon>
  </template>
</n-input>
<n-input split splitor="to" v-model="value" clearable>
  <template v-slot:affix>
    <n-icon><ios-calendar /></n-icon>
  </template>
</n-input>
```
```js
import iosCalendar from 'naive-ui/packages/icons/ios-calendar'

export default {
  components: {
    iosCalendar
  },
  data () {
    return {
      value: []
    }
  }
}
```
```css
.n-input {
  margin-bottom: 8px;
}
```