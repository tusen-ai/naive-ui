# Basic
```html
<n-alert title="Info Text" type="default">
  <template v-slot:icon>
    <n-icon>
      <ios-airplane />
    </n-icon>
  </template>
  Gee it's good to be back home
</n-alert>
<n-alert title="Info Text" type="info">
  Gee it's good to be back home
</n-alert>
<n-alert title="Success Text" type="success">
  Leave it till tomorrow to unpack my case
</n-alert>
<n-alert title="Warning Text" type="warning">
  Honey disconnect the phone
</n-alert>
<n-alert title="Error Text" type="error">
  I'm back in the U.S.S.R.
</n-alert>
```
```js
import iosAirplane from 'naive-ui/lib/icons/ios-airplane'

export default {
  components: {
    iosAirplane
  }
}
```
```css
.n-alert {
  margin-bottom: 12px;
}
```