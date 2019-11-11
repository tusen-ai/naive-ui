# Icon
```html
<n-alert title="Back in the U.S.S.R.">
  <template v-slot:icon>
    <n-icon>
      <ios-airplane />
    </n-icon>
  </template>
  Well the Ukraine girls really knock me out<br />
  They leave the West behind<br />
  And Moscow girls make me sing and shout<br />
  That Georgia's always on my mind<br />
  Aw come on!
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